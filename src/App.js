import './App.css'
import {Component} from 'react'
// eslint-disable-next-line
import {v4 as uuidv4} from 'uuid'

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    // eslint-disable-next-line
    isShow: false,
  }

  addContent = event => {
    event.preventDefault()
    const {username, password, website} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const newValue = {
      id: uuidv4(),
      websiteValue: website,
      usernameValue: username,
      passwordValue: password,
      initialValue: initial,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  changeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickChk = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onDelete = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({
      latestList: newList,
      isTrue: caseOf,
    })
  }

  searchInputFun = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {
      searchInput,
      username,
      website,
      password,
      latestList,
      isShow,
    } = this.state

    let {isTrue} = this.state

    const newList = latestList.filter(eachItem =>
      eachItem.websiteValue.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="appContainer">
        <img
          alt="app logo"
          className="img1Edit"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="cont1">
          <form className="formEdit" onSubmit={this.addContent}>
            <h1 className="headEdit">Add New Password</h1>
            <div className="inputCont">
              <img
                alt="website"
                className="imgEditSmall"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <input
                onChange={this.changeWebsite}
                className="inputContEdit"
                placeholder="Enter Website"
                type="text"
                value={website}
              />
            </div>

            <div className="inputCont">
              <img
                alt="username"
                className="imgEditSmall"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <input
                onChange={this.changeUsername}
                className="inputContEdit"
                placeholder="Enter Username"
                type="text"
                value={username}
              />
            </div>

            <div className="inputCont">
              <img
                alt="password"
                className="imgEditSmall"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <input
                onChange={this.changePassword}
                className="inputContEdit"
                placeholder="Enter Password"
                type="password"
                value={password}
              />
            </div>
            <button type="submit" className="btnEdit">
              Add
            </button>
          </form>
          <img
            className="imgEdit3"
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div className="cont2">
          <div className="contUp">
            <div className="contUp1">
              <h1 className="headEdit">Your Passwords</h1>
              <p className="headEdit2">{newList.length}</p>
            </div>
            <div className="inputCont">
              <img
                alt="search"
                className="imgEditSmall"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                className="inputContEdit"
                placeholder="Search"
                onChange={this.searchInputFun}
                type="search"
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hrEdit" />
          <div className="cont2-down1">
            <input type="checkbox" id="chk" onChange={this.onClickChk} />
            <label htmlFor="chk" className="headEdit">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="cont2Down">
              <img
                alt="no passwords"
                className="imgEd"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              />
              <p className="headEdit">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="cont2Down2">
              {newList.map(eachItem => (
                <li key={eachItem.id} id={eachItem.id} className="listEdit">
                  <div className="profileCont">
                    <h1 className="headEdit">{eachItem.initialValue}</h1>
                  </div>
                  <div className="listCont2">
                    <p className="headEdit2">{eachItem.websiteValue}</p>
                    <p className="headEdit2">{eachItem.usernameValue}</p>
                    {!isShow && (
                      <img
                        alt="stars"
                        className="starsEdit"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      />
                    )}
                    {isShow && (
                      <p className="headEdit2">{eachItem.passwordValue}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btnEdit"
                    onClick={() => this.onDelete(eachItem.id)}
                    data-testid="delete"
                  >
                    <img
                      alt="delete"
                      className="img3Edit"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
