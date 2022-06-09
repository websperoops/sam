import Icon from '@mui/material/Icon';

function Home() {
  return (
    <div className="App cust-cls">
      <div class="card-design">
        <div class="cardd">
          <div class=" card-upr">
            <img alt="user-gif" src="/img/pp.gif"/>
            <h4 class="name-cls">Sam Bale</h4>
            <h5 class="title-cls">Mortgage Consultant</h5>
            <h5 class="nlms">NLMS ID : <span>597055</span></h5>
            <h5 class="company">Company : <span>United Mortgage Corp</span></h5>
            <div class="contact-detailz">
              <span class="wa-icn"><a href><Icon>whatsapp_outlined</Icon></a></span>
              <span class="txt-icn"><a href><Icon>textsms_outlined</Icon></a></span>
              <span class="call-icn"><a href><Icon>call_outlined</Icon></a></span>
              <span class="mail-icn"><a href><Icon>alternate_email_outlined</Icon></a></span>
            </div>
          </div>
          <div class="service">
            <h2>Select One</h2>
            <div class="service-boxes">
              <div class="serv-box">
                <span>
                  <img  alt="Pre-Approval" src="/img/icn1.png"/>
                  <h6>Pre-Approval</h6>
                </span>
              </div>
              <div class="serv-box">
                <span>
                  <img  alt="Refinance" src="/img/icn2.png"/>
                  <h6>Refinance</h6>
                </span>
              </div>
              <div class="serv-box">
                <span>
                  <img  alt="Mortgage" src="/img/icn3.png"/>
                  <h6>Mortgage</h6>
                </span>
              </div>
              <div class="serv-box">
                <span>
                  <img  alt="Rates" src="/img/icn4.png"/>
                  <h6>Rates</h6>
                </span>
              </div>
            </div>
          </div>
          <div class="bottom-txt"><span>United Mortgage Crop provides mortgage</span></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
