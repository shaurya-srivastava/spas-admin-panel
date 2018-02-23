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

class PageController extends SimpleController
{
    public function pageMembers($request, $response, $args){

        return $this->ci->view->render($response, 'pages/members.html.twig');
    }

    public function pageIndex($request, $response, $args){
	    $ms = $this->ci->alerts;

        /** @var UserFrosting\Sprinkle\Account\Model\User $currentUser */
        $currentUser = $this->ci->currentUser;

        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Return 200 success if user is already logged in
        if ($authenticator->check()) {
            return $this->ci->view->render($response, 'pages/index.html');
        }else{
            return $response->withRedirect($this->ci->router->pathFor('loginAdminPanel'), 302);
	    }    
    }

    public function pageSignInAdminPanel($request, $response, $args){
        $config = $this->ci->config;

        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Forward to dashboard if user is already logged in
        // TODO: forward to user's landing page or last visited page
        if ($authenticator->check()) {
            return $response->withRedirect($this->ci->router->pathFor('indexAdminPanel'), 302);
        }

        // Load validation rules
        $schema = new RequestSchema("schema://login.json");
        $validatorLogin = new JqueryValidationAdapter($schema, $this->ci->translator);

        return $this->ci->view->render($response, 'pages/sign-in-admin-panel.html.twig', [
            "page" => [
                "validators" => [
                    "login"    => $validatorLogin->rules('json', false)
                ]
            ]
        ]);
    }

    public function pageCampaignRecordsAdminPanel($request, $response, $args){
        $ms = $this->ci->alerts;
        /** @var UserFrosting\Sprinkle\Account\Model\User $currentUser */
        $currentUser = $this->ci->currentUser;
        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Return 200 success if user is already logged in
        if ($authenticator->check()) {
            return $this->ci->view->render($response, 'pages/campaignRecords.html');
        }else{
            return $response->withRedirect($this->ci->router->pathFor('loginAdminPanel'), 302);
	    }
    }
    
    public function pageSMSRecordsAdminPanel($request, $response, $args){
        $ms = $this->ci->alerts;
        /** @var UserFrosting\Sprinkle\Account\Model\User $currentUser */
        $currentUser = $this->ci->currentUser;
        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Return 200 success if user is already logged in
        if ($authenticator->check()) {
            return $this->ci->view->render($response, 'pages/smsRecords.html');
        }else{
            return $response->withRedirect($this->ci->router->pathFor('loginAdminPanel'), 302);
	    }
    }

    public function pageSMSStatsAdminPanel($request, $response, $args){
        $ms = $this->ci->alerts;
        /** @var UserFrosting\Sprinkle\Account\Model\User $currentUser */
        $currentUser = $this->ci->currentUser;
        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Return 200 success if user is already logged in
        if ($authenticator->check()) {
            return $this->ci->view->render($response, 'pages/smsStats.html');
        }else{
            return $response->withRedirect($this->ci->router->pathFor('loginAdminPanel'), 302);
	    }
    }
    public function pageTestAdminPanel($request, $response, $args){
        $ms = $this->ci->alerts;
        /** @var UserFrosting\Sprinkle\Account\Model\User $currentUser */
        $currentUser = $this->ci->currentUser;
        /** @var UserFrosting\Sprinkle\Account\Authenticate\Authenticator $authenticator */
        $authenticator = $this->ci->authenticator;

        // Return 200 success if user is already logged in
        if ($authenticator->check()) {
            return $this->ci->view->render($response, 'pages/test.html');
        }else{
            return $response->withRedirect($this->ci->router->pathFor('loginAdminPanel'), 302);
	    }
    }


}

?>
