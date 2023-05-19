import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LocalStorage, SessionStorage } from 'web-storage-manager';
import AppSample from './AppSample';
import AppSample2 from './AppSample2';

class App extends Component {

  constructor(props) {
    super(props);

    // Local: true || Session: false
    this.state = {
      storageType: true
    }
  }

  componentWillMount() {

    console.clear()
    console.log(LocalStorage, SessionStorage)
    console.log('\n\n')

    this.testLibLocal()
  }

  changeStorageType(e) {
    this.setState({ storageType: e.target.checked });

    if (e.target.checked) {
      this.testLibLocal();
    } else {
      this.testLibSession();
    }
  }

  testLibLocal() {

    // updateItemInItem example
    const testItems = [
      {
        id: 1,
        value: '777',
        description: 'test item 1'
      }, {
        id: 2,
        value: '888',
        description: 'test item 2'
      }, {
        id: 3,
        value: '999',
        description: 'test item 3'
      }
    ]

    const testOjb = {
      name: 'Object',
      value: 'target of change',
      description: 'test item for object type'
    }

    const tObj = {
      'changethis': testItems, // key of this
      'changethis2': testOjb // key of this
    }

    let collection = {
      name: 'The data where our target object was saved',
      'targetObject': tObj // key of this
    }

    let collectionInfo = {
      description: 'just another layer for testing',
      'collection': collection // key of this
    }

    let parentItem = {
      name: 'parent item',
      description: 'test object',
      'targetKeyOnParent': collectionInfo // key of this
    }

    LocalStorage.setItem('test-sample', parentItem, true);
    LocalStorage.setItem('test-sample-for-compare', parentItem);

    const valueInObj = {
      id: 2,
      value: '01220',
      description: 'test item 99999 4776 999'
    }

    const keyPath = 'test-sample.targetKeyOnParent.collection.targetObject.changethis'
    LocalStorage.updateItemInItem(keyPath, valueInObj, 'id')

    const keyPath2 = 'test-sample.targetKeyOnParent.collection.targetObject.changethis2'
    LocalStorage.updateItemInItem(keyPath2, valueInObj)

    const keyPath3 = 'test-sample.targetKeyOnParent.collection.targetObject2'
    LocalStorage.updateItemInItem(keyPath3, testItems)

    const valueInObj2 = {
      id: 1,
      value: '015',
      description: 'test item 151'
    }
    const keyPath4 = 'test-sample.targetKeyOnParent.collection.targetObject2'
    LocalStorage.updateItemInItem(keyPath4, valueInObj2)

    // append
    LocalStorage.appendItem('test-sample', { new_item: { desc: 'new test item' } })
    LocalStorage.removeItemInItem(keyPath, valueInObj, 'id')

    LocalStorage.setItem('copy', LocalStorage.getItem('test-sample'))

    // save multiple
    LocalStorage.setMultiple([
      {
        key: 'multiple-save-1',
        value: 'multiple-save-data-1'
      },
      {
        key: 'multiple-save-2',
        value: ['multiple-save-data-2', 'multiple-save-data-2']
      }, {
        key: 'multiple-save-3',
        value: { desc: 'multiple-save-data-3' }
      }
    ])

    console.log("test-sample: ", LocalStorage.getItem('test-sample'));
    console.log('\n\n');
  }

  testLibSession() {

    // updateItemInItem example
    const testItems = [
      {
        id: 1,
        value: '777',
        description: 'test item 1'
      }, {
        id: 2,
        value: '888',
        description: 'test item 2'
      }, {
        id: 3,
        value: '999',
        description: 'test item 3'
      }
    ]

    const testOjb = {
      name: 'Object',
      value: 'target of change',
      description: 'test item for object type'
    }

    const tObj = {
      'changethis': testItems, // key of this
      'changethis2': testOjb // key of this
    }

    let collection = {
      name: 'The data where our target object was saved',
      'targetObject': tObj // key of this
    }

    let collectionInfo = {
      description: 'just another layer for testing',
      'collection': collection // key of this
    }

    let parentItem = {
      name: 'parent item',
      description: 'test object',
      'targetKeyOnParent': collectionInfo // key of this
    }

    SessionStorage.setItem('test-sample', parentItem, true);
    SessionStorage.setItem('test-sample-for-compare', parentItem);

    const valueInObj = {
      id: 2,
      value: '01220',
      description: 'test item 99999 4776 999'
    }

    const keyPath = 'test-sample.targetKeyOnParent.collection.targetObject.changethis'
    SessionStorage.updateItemInItem(keyPath, valueInObj, 'id')

    const keyPath2 = 'test-sample.targetKeyOnParent.collection.targetObject.changethis2'
    SessionStorage.updateItemInItem(keyPath2, valueInObj)

    const keyPath3 = 'test-sample.targetKeyOnParent.collection.targetObject2'
    SessionStorage.updateItemInItem(keyPath3, testItems)

    const valueInObj2 = {
      id: 1,
      value: '015',
      description: 'test item 151'
    }
    const keyPath4 = 'test-sample.targetKeyOnParent.collection.targetObject2'
    SessionStorage.updateItemInItem(keyPath4, valueInObj2)

    // append
    SessionStorage.appendItem('test-sample', { new_item: { desc: 'new test item' } })
    SessionStorage.removeItemInItem(keyPath, valueInObj, 'id')

    SessionStorage.setItem('copy', SessionStorage.getItem('test-sample'))

    // save multiple
    SessionStorage.setMultiple([
      {
        key: 'multiple-save-1',
        value: 'multiple-save-data-1'
      },
      {
        key: 'multiple-save-2',
        value: ['multiple-save-data-2', 'multiple-save-data-2']
      }, {
        key: 'multiple-save-3',
        value: { desc: 'multiple-save-data-3' }
      }
    ])

    console.log("test-sample: ", SessionStorage.getItem('test-sample'));
    console.log('\n\n');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br />
        <label>Is Local Storage: </label>
        <input className="storage-type" type={"checkbox"} value={this.state.storageType} onChange={this.changeStorageType.bind(this)} defaultChecked={this.state.storageType} />
        <br /><br />
        <label>Storage Type: {this.state.storageType ? "Local" : "Session"}</label>
        <br />
        <br />
        {
          this.state.storageType ? <AppSample /> : <AppSample2 />
        }
      </div>
    );
  }
}

export default App;
