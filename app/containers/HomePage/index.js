
import React from 'react';
import { Row, Col, Card, ListGroup, Dropdown, Button, Container, ListGroupItem } from 'react-bootstrap/'
import Header from '../../components/Header/Loadable';
import Footer from '../../components/Footer/Loadable';
import { NavLink } from 'react-router-dom'
import './dashboard.scss';
import { Title, Image, Description, Heading } from './dashboard-styles';


const logo = require('../../images/icon-512x512.png');
const teamsLogo = require('../../images/icons/team.svg');
const cardLogo = require('../../images/icons/credit-card.svg');

export default function HomePage() {
  return (
    <div>

      <Header />
      <div className='container mt-n5'>
        <Row>
          <Col xs={7} >
            <div className="card card-header-main flex-row flex-wrap shadow bg-white rounded">
              <div className="card-header card-img border-0">
                <Image src="//placehold.it/200" alt="" /> </div>
              <div className="card-block card-data px-2">
                <div className="card-title">
                  <Title>Raza Ahmed</Title>
                  <p className="card-text">razaahmed@rightfunds.com</p>
                </div>
                <p>765 Folsan Ave, Suite 600 San Francisco, CADGE 94017</p>
              </div>
            </div>
          </Col>
          <Col>
            <Card className='card-header-main shadow  bg-white'>
              <Card.Body className='complaints-data'>
                <div className="compaignData">
                  <Row>
                    <Col className='table-col1 tableRight'>
                      <Heading>43</Heading>
                      <Description>Total Campaign Created</Description>
                    </Col>
                    <Col className='table-col1'>
                      <Heading>71</Heading>
                      <Description>Active Campaign</Description>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='table-col tableRight'>
                      <Heading className='mt-4'>123</Heading>
                      <Description>Gift Aids</Description>
                    </Col>
                    <Col className='table-col'>
                      <Heading className='mt-4'>$ 128</Heading>
                      <Description>Total Raised</Description>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 15, marginBottom: 15 }}>
          <Col md={3} >
            <Card className="shadow mb-5 bg-white dataCard" style={{ height: '28rem' }}>
              <ListGroup variant="flush">



                <ListGroup.Item className='listItem'>
                  <NavLink to='/' className='text-decoration-none listItem' activeClassName='active'>
                    <div className='iconImage'>
                      {/* <img src={logo} fluid /> */}
                      <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512"><g><g><path d="M358.4,55.467c-18.825,0-34.133,15.309-34.133,34.133v6.17l-199.441,79.77c-3.234,1.306-5.359,4.437-5.359,7.927v119.467c0,3.49,2.125,6.622,5.359,7.919l199.441,79.77v6.178c0,18.825,15.309,34.133,34.133,34.133s34.133-15.309,34.133-34.133V89.6C392.533,70.775,377.225,55.467,358.4,55.467z M375.467,396.8c0,9.412-7.654,17.067-17.067,17.067s-17.067-7.654-17.067-17.067v-11.947c0-3.499-2.125-6.63-5.367-7.927l-199.433-79.77V189.244l199.433-79.77c3.243-1.306,5.367-4.437,5.367-7.927V89.6c0-9.412,7.654-17.067,17.067-17.067s17.067,7.654,17.067,17.067V396.8z" /></g></g><g><g><path d="M128,174.933H68.267C30.626,174.933,0,205.559,0,243.2s30.626,68.267,68.267,68.267H128c4.71,0,8.533-3.814,8.533-8.533V183.467C136.533,178.756,132.71,174.933,128,174.933z M119.467,294.4h-51.2c-28.237,0-51.2-22.963-51.2-51.2S40.03,192,68.267,192h51.2V294.4z" /></g></g><g><g><path d="M437.897,209.502l-51.2-17.067c-2.611-0.862-5.453-0.427-7.689,1.178c-2.227,1.604-3.541,4.181-3.541,6.921v85.333c0,2.739,1.314,5.316,3.541,6.929c1.476,1.058,3.226,1.604,4.992,1.604c0.905,0,1.818-0.145,2.697-0.444l51.2-17.067c3.49-1.152,5.837-4.412,5.837-8.09v-51.2C443.733,213.922,441.387,210.671,437.897,209.502z M426.667,262.647l-34.133,11.375v-61.653l34.133,11.375V262.647z" /></g></g><g><g><path d="M169.873,409.54l-8.567-8.576l-25.028-100.096c-0.947-3.797-4.361-6.468-8.277-6.468H59.733c-2.611,0-5.069,1.195-6.69,3.226c-1.621,2.048-2.219,4.719-1.621,7.262l34.133,145.067c0.93,3.917,4.42,6.579,8.303,6.579c0.538,0,1.075-0.051,1.621-0.162l64.085-12.373c0.085-0.017,0.171-0.034,0.256-0.051c3.755-0.845,7.185-2.722,9.916-5.41c3.891-3.849,6.05-8.969,6.084-14.447C175.855,418.62,173.756,413.466,169.873,409.54z M157.747,426.385c-0.435,0.435-0.981,0.734-1.579,0.887l-55.868,10.795l-29.79-126.601h50.825l23.996,95.932c0.375,1.502,1.152,2.876,2.244,3.968l10.206,10.206c0.862,0.862,0.981,1.877,0.981,2.415C158.754,424.508,158.618,425.523,157.747,426.385z" /></g></g><g><g><rect x="460.8" y="234.667" width="51.2" height="17.067" /></g></g><g><g><rect x="457.249" y="145.084" transform="matrix(0.8574 -0.5146 0.5146 0.8574 -10.3129 270.0117)" width="49.757" height="17.066" /></g></g><g><g><rect x="473.655" y="307.917" transform="matrix(0.5145 -0.8575 0.8575 0.5145 -51.2652 575.049)" width="17.067" height="49.758" /></g></g><g><g><rect x="324.267" y="98.133" width="17.067" height="290.133" /></g></g><g><g><rect x="85.333" y="209.067" width="17.067" height="34.133" /></g></g><g><g><rect x="51.2" y="209.067" width="17.067" height="34.133" /></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </div>


                Campaigns
                </NavLink>
                </ListGroup.Item>

                <div className='line'></div>
                <ListGroup.Item className='listItem'>
                  <svg height="20" className='iconImage' viewBox="0 -68 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m502 180.933594h-59.226562c-5.523438 0-10 4.476562-10 10v8.449218h-62.277344c-1.3125 0-2.613282.257813-3.824219.761719l-79.773437 33.015625c-9.230469 3.824219-16.402344 11.019532-20.1875 20.265625-3.789063 9.242188-3.730469 19.398438.164062 28.601563l.269531.636718c2.3125 5.460938 5.71875 10.105469 9.855469 13.777344-12.140625 3.292969-24.871094 3.558594-37.246094.726563l-78.316406-17.933594c-9.582031-2.191406-19.417969-.476563-27.691406 4.832031-8.269532 5.304688-13.929688 13.53125-15.929688 23.152344-3.964844 19.0625 7.714844 37.753906 26.585938 42.550781l93.445312 23.75c7.914063 2.007813 15.9375 3.007813 23.933594 3.007813 11.988281 0 23.917969-2.246094 35.304688-6.714844l118.84375-46.609375h16.84375v5.261719c0 5.523437 4.480468 10 10 10h59.226562c5.523438 0 10-4.476563 10-10v-137.53125c0-5.523438-4.476562-10-10-10zm-87.964844 122.269531c-1.25 0-2.488281.234375-3.648437.6875l-120.605469 47.304687c-15.066406 5.90625-31.320312 6.921876-47.007812 2.9375l-93.445313-23.75c-8.46875-2.152343-13.710937-10.539062-11.933594-19.09375.898438-4.320312 3.4375-8.011718 7.152344-10.390624 2.65625-1.707032 5.675781-2.585938 8.753906-2.585938 1.21875 0 2.449219.136719 3.671875.417969l78.316406 17.929687c18.84375 4.3125 38.339844 2.929688 56.386719-4.007812l22.726563-8.738282c.46875-.160156.933594-.332031 1.398437-.511718 20.089844-7.746094 45.730469-17.605469 51.242188-19.726563l1.074219-.414062c5.152343-1.980469 7.726562-7.769531 5.746093-12.921875-1.980469-5.15625-7.765625-7.726563-12.925781-5.746094 0 0-.410156.160156-1.167969.449219l-52.121093 20.042969c-8.835938 2.863281-18.390626-1.488282-22.085938-10.21875l-.273438-.640626c-1.800781-4.25-1.824218-8.945312-.074218-13.21875 1.75-4.273437 5.0625-7.601562 9.332031-9.367187l77.9375-32.257813h60.289063v83.820313zm77.964844 15.261719h-39.226562v-117.53125h39.226562zm0 0" /><path d="m97.382812 176.753906h-18.152343v-93.4375h2.769531c7.394531 0 14.777344-1.78125 21.351562-5.152344.308594-.160156.613282-.332031.902344-.523437l64.761719-42.253906c8.949219-4.390625 19.824219-3.390625 27.832031 2.59375l4.675782 3.484375c-.285157.402344-.558594.8125-.835938 1.214844-1.234375 1.796874-2.421875 3.628906-3.539062 5.5-6.914063 11.550781-11.355469 24.546874-12.988282 37.800781-6.816406.734375-13.128906 3.742187-18.042968 8.652343-5.691407 5.691407-8.828126 13.269532-8.828126 21.332032 0 16.628906 13.53125 30.160156 30.160157 30.160156h74.03125c4.085937 0 7.933593 1.59375 10.820312 4.472656 2.898438 2.90625 4.496094 6.757813 4.5 10.84375-.003906 6.101563-3.578125 11.601563-9.144531 14.027344-.644531.285156-1.226562.496094-1.773438.648438-.050781.015624-.097656.03125-.148437.046874-1.347656.390626-2.777344.589844-4.253906.589844h-84.117188c-5.519531 0-10 4.476563-10 10 0 5.523438 4.480469 10 10 10h84.117188c2.582031 0 5.128906-.28125 7.605469-.824218 4.199218.539062 8.453124.832031 12.683593.832031 54.246094 0 98.382813-44.132813 98.382813-98.382813 0-54.246094-44.136719-98.378906-98.382813-98.378906-24.996093 0-48.921875 9.519531-67.027343 26.378906l-5.929688-4.425781c-14.207031-10.613281-33.585938-12.242187-49.359375-4.144531-.308594.15625-.605469.332031-.898437.519531l-64.753907 42.25c-3.65625 1.792969-7.726562 2.734375-11.800781 2.734375h-2.773438v-3.617188c0-5.523437-4.476562-10-10-10h-59.226562c-5.523438 0-10 4.476563-10 10v137.53125c0 5.523438 4.476562 10 10 10h59.226562c5.523438 0 10-4.476562 10-10v-.472656h18.15625c5.519532 0 10-4.476562 10-10 0-5.523437-4.480468-10-10-10zm79.90625-60.789062c0-2.71875 1.054688-5.273438 2.972657-7.1875 1-1 2.175781-1.761719 3.457031-2.265625.542969 6.6875 1.761719 13.234375 3.636719 19.609375-5.558594-.050782-10.066407-4.585938-10.066407-10.15625zm182.859376-17.582032c0 39.144532-28.847657 71.683594-66.40625 77.464844 2.007812-4.507812 3.058593-9.46875 3.058593-14.40625 0-6.058594-1.527343-11.882812-4.386719-17.054687 4.339844-.683594 8.347657-2.6875 11.515626-5.855469 3.960937-3.957031 6.140624-9.21875 6.140624-14.816406v-14.789063c0-11.554687-9.402343-20.957031-20.957031-20.957031h-14.671875c-.527344 0-.957031-.429688-.957031-.957031v-13.960938c0-.527343.429687-.953125.957031-.953125h7.332032.003906.003906 7.332031c.527344 0 .957031.425782.957031.953125 0 5.523438 4.476563 10 10 10 5.519532 0 10-4.476562 10-10 0-10.648437-7.996093-19.449219-18.292968-20.765625v-3.464844c0-5.523437-4.476563-10-10-10-5.523438 0-10 4.476563-10 10v3.464844c-10.300782 1.316406-18.292969 10.117188-18.292969 20.765625v13.960938c0 11.554687 9.402344 20.957031 20.957031 20.957031h14.671875c.527344 0 .957031.429688.957031.957031v14.789063c0 .261718-.09375.488281-.28125.675781-.1875.183594-.410156.277344-.675781.277344h-14.671875c-.527344 0-.957031-.429688-.957031-.953125v-1.355469c0-5.523437-4.476563-10-10-10s-10 4.476563-10 10v1.355469c0 .8125.058594 1.613281.148437 2.40625h-45.195312c-3.351562-8.820313-5.046875-18.128906-5.046875-27.738282 0-14.652343 4.167969-29.320312 12.019531-41.707031 2.257813-3.558593 4.773438-6.953125 7.566406-10.113281 14.878907-16.882812 36.292969-26.5625 58.792969-26.5625 43.21875 0 78.378907 35.160156 78.378907 78.382812zm-300.921876 88.847657h-39.226562v-117.535157h39.226562zm0 0" /><path d="m145.390625 181.210938c-2.347656-3.589844-6.949219-5.242188-11.054687-4.066407-3.96875 1.140625-6.863282 4.691407-7.21875 8.800781-.359376 4.152344 2.050781 8.207032 5.839843 9.914063 3.753907 1.695313 8.273438.882813 11.195313-2.027344 3.332031-3.328125 3.847656-8.710937 1.238281-12.621093zm0 0" /></svg>

                Donations</ListGroup.Item>
                <div className='line'></div>

                <ListGroup.Item className='listItem'>
                  <div className='iconImage'>
                    <img src={teamsLogo} fluid="true" />
                  </div>
              Teams Members</ListGroup.Item>
                <div className='line'></div>

                <ListGroup.Item className='listItem'>
                  <div className='iconImage'>
                    <img src={cardLogo} fluid="true" />
                  </div>

               My Cards</ListGroup.Item>
                <div className='line'></div>


              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card className="dataCard shadow mb-5 bg-white">
              <Card.Header style={{ background: 'transparent' }}>
                <Card.Title className="campaignHeader">
                  <span style={{ marginTop: '8px' }}>My Campaigns</span>
                  <div className="campaignHeader">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic" className="dropBtn">
                        Active Campaigns</Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item className="dropItem" href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button className="campaignBtn" >Create New Campaign</Button>{' '}
                  </div>
                </Card.Title></Card.Header>

              <Card.Body>

                <Container>

                  <Row>
                    <Col sm>
                      <Card style={{ border: 'none' }}>
                        <div className='give-card__media'>
                          <img style={{ width: '100%' }} src="http://quomodosoft.com/wp/profund/wp-content/uploads/2019/08/causes-5.jpg" alt="" />
                          {/* <Card.Img variant="top" src={logo} /> */}
                        </div>

                        <Card.Body>
                          <Card.Title className='d-flex align-items-center author_details'>
                            <div className="author-photo">
                              <img alt="" src="https://0.gravatar.com/avatar/6a7831cd395934213cf4dc10a70a7e80?s=96&amp;d=mm&amp;r=g" class="avatar avatar-96 photo" height="96" width="96" />
                            </div>
                            <span class="author-name">Ashekur_rahman</span>

                          </Card.Title>
                          <h3 class="give-card__title">Clothes For Everyone</h3>
                          <div class="skillbar" data-percent="100%">
                            <div class="count-bar" style={{ width: "100%" }}></div>
                            <div class="count"><span>100%</span></div>
                          </div>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                          <ul class="campign-info">
                            <li class="raised">
                              <span class="title">Raised</span>
                              <span class="content">$5,900</span>
                            </li>
                            <li class="pledged">
                              <span class="title">Pledged</span>
                              <span class="content">$3,000</span>
                            </li>
                            <li class="donators">
                              <span class="title">Donators</span>
                              <span class="content">29</span>
                            </li>
                          </ul>
                          <div className='campaignBtns'>
                            <Button className="viewCampaignBtn" >View Campaign</Button>
                            <Button className="editCampaignBtn" >Edit Campaign</Button>
                          </div>
                        </Card.Body>

                      </Card>
                    </Col>
                    <Col sm>
                      <Card style={{ border: 'none' }}>
                        <div className='give-card__media'>
                          <img style={{ width: '100%' }} src="http://quomodosoft.com/wp/profund/wp-content/uploads/2019/08/causes-5.jpg" alt="" />
                          {/* <Card.Img variant="top" src={logo} /> */}
                        </div>

                        <Card.Body>
                          <Card.Title className='d-flex align-items-center author_details'>
                            <div className="author-photo">
                              <img alt="" src="https://0.gravatar.com/avatar/6a7831cd395934213cf4dc10a70a7e80?s=96&amp;d=mm&amp;r=g" class="avatar avatar-96 photo" height="96" width="96" />
                            </div>
                            <span class="author-name">Ashekur_rahman</span>

                          </Card.Title>
                          <h3 class="give-card__title">Clothes For Everyone</h3>
                          <div class="skillbar" data-percent="100%">
                            <div class="count-bar" style={{ width: "100%" }}></div>
                            <div class="count"><span>100%</span></div>
                          </div>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                          <ul class="campign-info">
                            <li class="raised">
                              <span class="title">Raised</span>
                              <span class="content">$5,900</span>
                            </li>
                            <li class="pledged">
                              <span class="title">Pledged</span>
                              <span class="content">$3,000</span>
                            </li>
                            <li class="donators">
                              <span class="title">Donators</span>
                              <span class="content">29</span>
                            </li>
                          </ul>
                          <div className='campaignBtns'>
                            <Button className="viewCampaignBtn" >View Campaign</Button>
                            <Button className="editCampaignBtn" >Edit Campaign</Button>
                          </div>
                        </Card.Body>

                      </Card>
                    </Col>

                    <Col sm>
                      <Card style={{ border: 'none' }}>
                        <div className='give-card__media'>
                          <img style={{ width: '100%' }} src="http://quomodosoft.com/wp/profund/wp-content/uploads/2019/08/causes-5.jpg" alt="" />
                          {/* <Card.Img variant="top" src={logo} /> */}
                        </div>

                        <Card.Body>
                          <Card.Title className='d-flex align-items-center author_details'>
                            <div className="author-photo">
                              <img alt="" src="https://0.gravatar.com/avatar/6a7831cd395934213cf4dc10a70a7e80?s=96&amp;d=mm&amp;r=g" class="avatar avatar-96 photo" height="96" width="96" />
                            </div>
                            <span class="author-name">Ashekur_rahman</span>

                          </Card.Title>
                          <h3 class="give-card__title">Clothes For Everyone</h3>
                          <div class="skillbar" data-percent="100%">
                            <div class="count-bar" style={{ width: "100%" }}></div>
                            <div class="count"><span>100%</span></div>
                          </div>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                          <ul class="campign-info">
                            <li class="raised">
                              <span class="title">Raised</span>
                              <span class="content">$5,900</span>
                            </li>
                            <li class="pledged">
                              <span class="title">Pledged</span>
                              <span class="content">$3,000</span>
                            </li>
                            <li class="donators">
                              <span class="title">Donators</span>
                              <span class="content">29</span>
                            </li>
                          </ul>
                          <div className='campaignBtns'>
                            <Button className="viewCampaignBtn" >View Campaign</Button>
                            <Button className="editCampaignBtn" >Edit Campaign</Button>
                          </div>
                        </Card.Body>

                      </Card>
                    </Col>

                  </Row>
                </Container>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer></Footer>

    </div>
  );
}
