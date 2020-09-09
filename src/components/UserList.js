import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import UserDetails from './UserDetails'
import axios from 'axios'

export default class UserList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  componentDidMount() {
    this.getCustomerData();
  }

  getCustomerData() {
    axios.get('assets/samplejson/userlist.json').then(response => {
      this.setState({userList: response})
    })
  };

  render() {
    console.log(this.state)
    if (!this.state.userList)
      return (<p>Loading data</p>)
    return (<div className="addmargin">
      <div className="col-md-3">
        {

          this.state.userList.data.members.map(customer => <Panel bsStyle="info" key={customer.name} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{customer.real_name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>{customer.id}</p>
              <p>{customer.tz}</p>
              <Button bsStyle="info" onClick={() => this.setState({selectedCustomer: customer.id})}>

                Click to View Details

              </Button>

            </Panel.Body>
          </Panel>)
        }
      </div>
      <div className="col-md-6">
        <UserDetails val={this.state.selectedCustomer}/>
      </div>
    </div>)
  }

}
