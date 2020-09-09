import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'
import { Modal } from "react-bootstrap";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

export default class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.getUserDetail(this.props.val)
  }

  componentDidUpdate(prevProps) {

    if (this.props.val !== prevProps.val) {
      this.getUserDetail(this.props.val)
    }
  }

  //Function to Load the userDetail data from json.
  getUserDetail(id) {
    axios.get('assets/samplejson/userlist.json').then(response => {
      console.log(response.data.members)
      let userList = response.data.members;
      let userDetails = []
      userList.forEach(element => {
        if (element.id == id) {
          userDetails.push(element)
        }
      });
      this.setState({ userDetails: userDetails })
    })
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { value } = this.state;
    let userDetail = this.state.userDetails && this.state.userDetails[0] ? this.state.userDetails[0] : null;
    console.log(userDetail)
    console.log(this.state)
    if (!userDetail)
      return (<h3>Please Select Record to view details</h3>)
    return (<div className="UserDetails">
      {userDetail != null ?
        <Panel bsStyle="info" className="centeralign">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{userDetail.real_name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <p><strong>Name :</strong> {userDetail.real_name}</p>
            <p><strong>Id :</strong> {userDetail.id}</p>
            <p><strong>Time Zone :</strong> {userDetail.tz}</p>
            <p><strong>Activity Perios :</strong>
              <ul class="list-group">
                <li class="list-group-item">Start Date : {userDetail.activity_periods[0].start_time} <CalendarTodayIcon color="primary" className="calender-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    let date = moment(userDetail.activity_periods[0].start_time, 'MMM D YYYY h:mma').toDate();
                    this.setState({ show: true, value:date});
                  }} /></li>
                <li class="list-group-item">End Date : {userDetail.activity_periods[0].end_time}<CalendarTodayIcon color="primary" className="calender-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    let date = moment(userDetail.activity_periods[0].end_time, 'MMM D YYYY h:mma').toDate();
                    this.setState({ show: true, value:date});
                  }} /></li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item">Start Date : {userDetail.activity_periods[1].start_time} <CalendarTodayIcon color="primary" className="calender-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    let date = moment(userDetail.activity_periods[1].start_time, 'MMM D YYYY h:mma').toDate();
                    this.setState({ show: true, value:date});
                  }} /></li>
                <li class="list-group-item">End Date : {userDetail.activity_periods[1].end_time}<CalendarTodayIcon color="primary" className="calender-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    let date = moment(userDetail.activity_periods[1].end_time, 'MMM D YYYY h:mma').toDate();
                    this.setState({ show: true, value:date});
                  }} /></li>
              </ul>

              <ul class="list-group">
                <li class="list-group-item">Start Date : {userDetail.activity_periods[2].start_time} <CalendarTodayIcon color="primary" className="calender-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    let date = moment(userDetail.activity_periods[2].start_time, 'MMM D YYYY h:mma').toDate();
                    this.setState({ show: true, value:date});
                  }} /></li>
                <li class="list-group-item">End Date : {userDetail.activity_periods[2].end_time}<CalendarTodayIcon color="primary" className="calender-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    let date = moment(userDetail.activity_periods[2].end_time, 'MMM D YYYY h:mma').toDate();
                    this.setState({ show: true, value:date});
                  }} /></li>
              </ul>
            </p>
          </Panel.Body>
        </Panel> : null
      }
      <Modal
        show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title > User was active on :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar value={this.state.value} />
        </Modal.Body>
      </Modal>

    </div>)
  }
}
