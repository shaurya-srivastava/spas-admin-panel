<?php

namespace UserFrosting\Sprinkle\Site\Controller;

use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Capsule\Manager as Capsule;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use UserFrosting\Fortress\RequestDataTransformer;
use UserFrosting\Fortress\RequestSchema;
use UserFrosting\Fortress\ServerSideValidator;
use UserFrosting\Fortress\Adapter\JqueryValidationAdapter;
use UserFrosting\Sprinkle\Account\Authenticate\Authenticator;
use UserFrosting\Sprinkle\Account\Controller\Exception\SpammyRequestException;
use UserFrosting\Sprinkle\Account\Model\Group;
use UserFrosting\Sprinkle\Account\Model\User;
use UserFrosting\Sprinkle\Account\Util\Password;
use UserFrosting\Sprinkle\Account\Util\Util as AccountUtil;
use UserFrosting\Sprinkle\Core\Controller\SimpleController;
use UserFrosting\Sprinkle\Core\Facades\Debug;
use UserFrosting\Sprinkle\Core\Mail\EmailRecipient;
use UserFrosting\Sprinkle\Core\Mail\TwigMailMessage;
use UserFrosting\Sprinkle\Core\Throttle\Throttler;
use UserFrosting\Sprinkle\Core\Util\Captcha;
use UserFrosting\Sprinkle\Core\Util\Util;
use UserFrosting\Support\Exception\BadRequestException;
use UserFrosting\Support\Exception\ForbiddenException;
use UserFrosting\Support\Exception\HttpException;

class AccountControllerAdminPanel extends SimpleController
{

public function loginAdminPanel($request, $response, $args)
    {
       /** @var UserFrosting\Sprinkle\Core\MessageStream $ms */
       $ms = $this->ci->alerts;
       
               /** @var UserFrosting\Sprinkle\Account\Database\Models\User $currentUser */
               $currentUser = $this->ci->currentUser;
       
               /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
               $authenticator = $this->ci->authenticator;
       
               // Return 200 success if user is already logged in
               if ($authenticator->check()) {
                   $ms->addMessageTranslated('warning', 'LOGIN.ALREADY_COMPLETE');
                   return $response->withStatus(200);
               }
       
               /** @var UserFrosting\Config\Config $config */
               $config = $this->ci->config;
       
               // Get POST parameters
               $params = $request->getParsedBody();
       
               // Load the request schema
               $schema = new RequestSchema('schema://requests/login.yaml');
       
               // Whitelist and set parameter defaults
               $transformer = new RequestDataTransformer($schema);
               $data = $transformer->transform($params);
       
               // Validate, and halt on validation errors.  Failed validation attempts do not count towards throttling limit.
               $validator = new ServerSideValidator($schema, $this->ci->translator);
               if (!$validator->validate($data)) {
                   $ms->addValidationErrors($validator);
                   return $response->withStatus(400);
               }
       
               // Determine whether we are trying to log in with an email address or a username
               $isEmail = filter_var($data['user_name'], FILTER_VALIDATE_EMAIL);
       
               // Throttle requests
       
               /** @var UserFrosting\Sprinkle\Core\Throttle\Throttler $throttler */
               $throttler = $this->ci->throttler;
       
               $userIdentifier = $data['user_name'];
       
               $throttleData = [
                   'user_identifier' => $userIdentifier
               ];
       
               $delay = $throttler->getDelay('sign_in_attempt', $throttleData);
               if ($delay > 0) {
                   $ms->addMessageTranslated('danger', 'RATE_LIMIT_EXCEEDED', [
                       'delay' => $delay
                   ]);
                   return $response->withStatus(429);
               }
       
               // Log throttleable event
               $throttler->logEvent('sign_in_attempt', $throttleData);
       
               // If credential is an email address, but email login is not enabled, raise an error.
               // Note that we do this after logging throttle event, so this error counts towards throttling limit.
               if ($isEmail && !$config['site.login.enable_email']) {
                   $ms->addMessageTranslated('danger', 'USER_OR_PASS_INVALID');
                   return $response->withStatus(403);
               }
       
               // Try to authenticate the user.  Authenticator will throw an exception on failure.
               /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
               $authenticator = $this->ci->authenticator;
       
               $currentUser = $authenticator->attempt(($isEmail ? 'email' : 'user_name'), $userIdentifier, $data['password'], $data['rememberme']);
       
               $ms->addMessageTranslated('success', 'WELCOME', $currentUser->export());
       
               // Set redirect, if relevant
               $redirectOnLogin = $this->ci->get('redirect.onLogin');
       
               return $redirectOnLogin($request, $response, $args);

	}

public function logoutAdminPanel(Request $request, Response $response, $args)
    {
        // Destroy the session
        $this->ci->authenticator->logout();
        
                // Return to home page
                $config = $this->ci->config;
                //return $response->withStatus(302)->withHeader('Location', $config['site.uri.public']);
                return $response->withRedirect($this->ci->router->pathFor('loginAdminPanel'), 302);
    }

public function settingsAdminPanel($request, $response, $args)
    {
        /** @var UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager */
        $authorizer = $this->ci->authorizer;

        /** @var UserFrosting\Sprinkle\Account\Model\User $currentUser */
        $currentUser = $this->ci->currentUser;

        // Access-controlled page
        if (!$authorizer->checkAccess($currentUser, 'uri_account_settings')) {
            throw new ForbiddenException();
        }

        // Load validation rules
        $schema = new RequestSchema("schema://account-settings.json");
        $validatorAccountSettings = new JqueryValidationAdapter($schema, $this->ci->translator);

        $schema = new RequestSchema("schema://profile-settings.json");
        $validatorProfileSettings = new JqueryValidationAdapter($schema, $this->ci->translator);

        /** @var Config $config */
        $config = $this->ci->config;

        // Get a list of all locales
        $locales = $config['site.locales.available'];

        return $this->ci->view->render($response, 'pages/account-settings-admin-panel.html.twig', [
            "locales" => $locales,
            "page" => [
                "validators" => [
                    "account_settings"    => $validatorAccountSettings->rules('json', false),
                    "profile_settings"    => $validatorProfileSettings->rules('json', false)
                ],
                "visibility" => ($authorizer->checkAccess($currentUser, "update_account_settings") ? "" : "disabled")
            ]
        ]);
    }


}

