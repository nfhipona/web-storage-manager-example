import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Storage from 'web-storage-manager';
import AppSample from './AppSample';

class App extends Component {

  componentWillMount() {
    this.testLib()
  }

  testLib() {

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

    Storage.setItem('test-sample', parentItem);
    Storage.setItem('test-sample-for-compare', parentItem);

    const valueInObj = {
      id: 2,
      value: '01220',
      description: 'test item 101'
    }

    const keyPaths = [ 'targetKeyOnParent', 'collection', 'targetObject', 'changethis']
    Storage.updateItemInItem('test-sample', keyPaths, valueInObj, 'id')

    const keyPaths2 = [ 'targetKeyOnParent', 'collection', 'targetObject', 'changethis2']
    Storage.updateItemInItem('test-sample', keyPaths2, valueInObj)

    const keyPaths3 = [ 'targetKeyOnParent', 'collection', 'targetObject2']
    Storage.updateItemInItem('test-sample', keyPaths3, testItems)

    const valueInObj2 = {
      id: 1,
      value: '015',
      description: 'test item 151'
    }
    const keyPaths4 = [ 'targetKeyOnParent', 'collection', 'targetObject2']
    Storage.updateItemInItem('test-sample', keyPaths4, valueInObj2)

    // append
    Storage.appendItem('test-sample', { new_item : { desc: 'new test item' } })

    Storage.removeItemInItem('test-sample', keyPaths, valueInObj, 'id')

    // // save multiple
    // Storage.setMultiple([
    //   {
    //     key: 'multiple-save-1',
    //     value: 'multiple-save-data-1'
    //   },
    //   {
    //     key: 'multiple-save-2',
    //     value: ['multiple-save-data-2', 'multiple-save-data-2']
    //   },{
    //     key: 'multiple-save-3',
    //     value: { desc: 'multiple-save-data-3' }
    //   }
    // ])

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> 
        </header>
        <br />
        <AppSample />
      </div>
    );
  }
}

export default App;
