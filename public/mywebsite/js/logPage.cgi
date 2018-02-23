#!/usr/bin/perl

use warnings;
print "Content-type:text/html\r\n\r\n";

my @retval = `perl /var/www/cgi-bin/getFile.pl /var/log/influxdb/influxd.log check`;
my @retval2 = `perl /var/www/cgi-bin/getFile.pl /var/log/grafana/grafana.log eror`;


$html = qq{
  <html>
    <head>
      <!--Import Google Icon Font-->
      <!--<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">-->
      <!--Import materialize.css-->
      <link type="text/css" rel="stylesheet" href="/mywebsite/css/materialize.min.css"  media="screen,projection"/>

      <!--Let browser know website is optimized for mobile-->
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    </head>

    <body>
      <!--Import jQuery before materialize.js-->
      <script type="text/javascript" src="/mywebsite/js/jquery-2.1.1.min.js"></script>
      <script type="text/javascript" src="/mywebsite/js/materialize.min.js"></script>
      <script type="text/javascript" src="/mywebsite/js/get_logs.js"></script>
      <nav class="white" role="navigation">
       <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo"><span class="red-text">J</span><span class="black-text">Spectrum</span></a>
          <ul class="right hide-on-med-and-down">
          <ul class="right hide-on-med-and-down">
            <li><a href="index.cgi" class="black-text">Home</a></li>
          </ul>

          <ul id="nav-mobile" class="side-nav">
            <li><a href="index.cgi">Home</a></li>
          </ul>
          <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
        </div>
      </nav>
      <br><br>

      
        <form class="col s10" id="inputForm" name="inputForm" method="POST" onsubmit="">
        <div class="row container">
          <div class="input-field col s3">
            <input id="imsi" type="text" class="validate">
            <input type="hidden" id="filename" value="/var/log/influxdb/influxd.log">
            <label for="imsi">IMSI</label>
            </div>
          <div class="input-field col s3">
            <input id="msisdn" type="text" class="validate">
            <input type="hidden" id="host" value="/var/log/grafana/grafana.log">
            <label for="msisdn">MSISDN</label>
            </div>
          <div class="input-field col s3">
            <input id="tlrrID" type="text" class="validate">
            <label for="tlrrID">TLRR ID</label>
            </div>
          <div class="input-field col s3">
            <input id="nameArea" type="text" class="validate">
            <label for="nameArea">NameArea</label>
            </div>
          <div class="input-field col s3">
            <div class="input-field col 6">
              <input name="radio1" type="radio" id="hour_radio" value="hour" />
              <label for="hour_radio">Last 1 hour</label>
              </div>
            <div class="input-field col s6">
              <input name="radio1" type="radio" id="date_radio" value="date" checked="checked"/>
              <label for="date_radio">Select a Date</label>
              </div>
            </div>
            
          <div class="input-field col s3">
            <input id="datepicker" type="date" class="datepicker">
            </div>

            
              <div class="input-field col s3">
                <select name="selector" id="logSelection">
                  <option value="test" disabled selected> Choose the VM and Log file</option>
                  <optgroup label="JMLCM 01-15">
                      <option value="jmlcm&mlpServer&res.log"> MLP Server : res.log</option>
                      <option value="jmlcm&mlpServer&req.log"> MLP Server : req.log </option>
                      <option value="jmlcm&tlrr&res.log"> TLRR : res.log </option>
                      <option value="jmlcm&tlrr&traffic.log"> TLRR : traffic.log </option>
                  </optgroup>
                  <optgroup label="PROBE 1-8">
                    <option value="probe&umsc&traffic.log">  UMSCXX : traffic.log </option>
                  </optgroup>
                  <optgroup label="PSIU/PSLTE">
                    <option value="ps&polystar&traffic.log"> Polystar Decoder : traffic.log </option>
                  </optgroup>
                  <label> Select </label>
                </select>
                </div>
          </div>
          
          <div class="row container">
          <div class="col s2 offset-s5">
            <button class="btn-large waves-effect waves-light" type="submit" name="action">Search</button>
            </div>
          </div>
        </form>

      <!--<div class="row center">
        <a href="#" id="download-button" class="btn-large waves-effect waves-light materialize-blue ligten-4">Search</a>
      </div>-->
      <!--<div class="row">
        <div class="col s6 offset-s3">
          <div class="card-panel white">
            <span class="black-text"><h4>IMSI <br><br><div id="msisdnToimsiResult"></div></h4>
            </span>
          </div>
          <div class="card-panel white">
            <span class="black-text"><h4>MSISDN <br><br><div id="imsiTomsisdnResult"></div></h4>
          </div> 
        </div>
        <div class="col s6 offset-s3">-->
          

        <div class="row s12">
                <div class="col s4 offset-s2">
                  <div class="card-panel white">
                   <span class="black-text"><h5>IMSI <br><br><div id="msisdnToimsiResult"></div></h5>
                   </span>
                  </div>
                </div>
                <div class="col s4">
                  <div class="card-panel white">
                    <span class="black-text"><h5>MSISDN <br><br><div id="imsiTomsisdnResult"></div></h5>
                      <div id="logResult2"></div>
                      </span>
                    </div>
                  </div>

                 <div class="col s12">
                    <div class="card-panel white">
                      <span class="black-text"><h5 id="hostnameAndFilenameResult"></h5></span>
                       <div id="Result">
                       </div>
                  </div>
                </div>
                  
            </div> <!-- End of Row 1-->
};


print $html;

#foreach my $lineInflux(@retval){
#  print "$lineInflux<br>";
#}

