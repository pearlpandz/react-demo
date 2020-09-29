import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    this.getRecords();
  }

  constructor(props) {
    super(props);
    this.state = {
      years: [
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
      ],
      records: [],
      selectedYear: 2014,
      selectedLaunching: true,
      selectedLanding: true
    }
  }



  getRecords = async () => {
    const { selectedYear, selectedLaunching, selectedLanding } = this.state;
    console.log(selectedYear, selectedLaunching, selectedLanding);
    let url = `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${selectedLaunching}&land_success=${selectedLanding}&launch_year=${selectedYear}`;
    await axios.get(url).then(res => {
      this.setState({ records: res.data });
    }).catch(error => {
      console.log(error.response)
    });
  }


  render() {
    const { years, records } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-center">SpaceX Launching Programs</h1>
        </header>
        <div className="page-content">
          <div className="sidebar">
            <div>
              <h4>Launch Year</h4>
              <ul>
                {
                  years.map((year, index) => {
                    return <li key={index}><button className={this.state.selectedYear === year ? 'active' : ''} onClick={() => {
                      this.setState({
                        selectedYear: year
                      }, () => {
                        this.getRecords();
                      });
                    }}>{year}</button></li>
                  })
                }
              </ul>
            </div>
            <div>
              <h4>Successfull Launch</h4>
              <ul>
                <li>
                  <button className={this.state.selectedLaunching ? 'active' : ''} onClick={() => {
                    this.setState({
                      selectedLaunching: true
                    }, () => {
                      this.getRecords();
                    });
                  }}> True</button>
                </li>
                <li>
                  <button className={!this.state.selectedLaunching ? 'active' : ''} onClick={() => {
                    this.setState({
                      selectedLaunching: false
                    }, () => {
                      this.getRecords();
                    });
                  }}>False</button>
                </li>
              </ul>
            </div>
            <div>
              <h4>Successfull Landing</h4>
              <ul>
                <li>
                  <button className={this.state.selectedLanding ? 'active' : ''} onClick={() => {
                    this.setState({
                      selectedLanding: true
                    }, () => {
                      this.getRecords();
                    });
                  }}>True</button>
                </li>
                <li>
                  <button className={!this.state.selectedLanding ? 'active' : ''} onClick={() => {
                    this.setState({
                      selectedLanding: false
                    }, () => {
                      this.getRecords();
                    });
                  }}>False</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="cards">
            {records.length > 0 ?

              records.map((record, index) => {
                return <div className="card" key={index}>
                  <img src={record.links.mission_patch_small} alt={record.mission_name} />
                  <h4>{record.mission_name}</h4>
                  <p className="margin-zero"><b>Mission Ids:</b>{record.mission_id}</p>
                  <p className="margin-zero"><b>Launch Year</b>{record.launch_year}</p>
                  <p className="margin-zero"><b>Successfully Launch</b>{record.launch_success}</p>
                  <p className="margin-zero"><b>Successfully Landing</b>{record.launch_success}</p>
                </div>
              })

              : <div className="fcenter">
                <h4>No data found</h4>
              </div>
            }
          </div>


        </div>
      </div>
    );
  }
}
export default App;
