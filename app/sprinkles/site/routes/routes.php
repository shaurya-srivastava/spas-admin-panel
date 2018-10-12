<?php

global $app;
$app->get('/members', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageMembers');
$app->get('/index', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageIndex')->setName('indexAdminPanel');
$app->get('/sign-in', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageSignInAdminPanel')->setName('loginAdminPanel');;
$app->post('/loginAdminPanel', 'UserFrosting\Sprinkle\Site\Controller\AccountControllerAdminPanel:loginAdminPanel');
$app->get('/logoutAdminPanel', 'UserFrosting\Sprinkle\Site\Controller\AccountControllerAdminPanel:logoutAdminPanel')->add('authGuard');

$app->get('/settings', 'UserFrosting\Sprinkle\Site\Controller\AccountControllerAdminPanel:settingsAdminPanel');

$app->get('/campaign-records', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageCampaignRecordsAdminPanel');
$app->get('/sms-records', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageSMSRecordsAdminPanel');
$app->get('/sms-stats', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageSMSStatsAdminPanel');
$app->get('/drill-module', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageDrillModuleAdminPanel');
$app->get('/test', 'UserFrosting\Sprinkle\Site\Controller\PageController:pageTestAdminPanel');

?>
