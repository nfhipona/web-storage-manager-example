import React, { Component } from 'react';
import Storage from 'web-storage-manager';
import './AppSample.css';

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

const collection = {
    description: 'The data where our target object was saved',
    targetObject: { // key of this
        description: 'Change this using Update Item in Item',
        changethis: testItems
    }
}

const collectionInfo = {
    description: 'just another layer for testing',
    'collection': collection // key of this
}

const parentItem = {
    name: 'parent item',
    description: 'test object',
    'targetKeyOnParent': collectionInfo // key of this
}

const defaultJson = {
    name: 'Sample',
    note: 'This must be a valid json',
    description: 'To test `sample-insert` or `multiple-sample-insert` get the value and paste the object then hit `Set JSON`. In browser console, Application tab, check the data.',
    'Set JSON': parentItem, // key of this
    'Set Multiple': [
        {
            key: 'multiple-save-1',
            value: 'multiple-save-data-1'
        },
        {
            key: 'multiple-save-2',
            value: {
                description: 'multiple save 2',
                testItems
            }
        },
        {
            key: 'multiple-save-3',
            value: testItems
        }
    ]
}

const cKeys = {
    keys: ['targetKeyOnParent', 'collection', 'targetObject', 'changethis'],
    attrib: 'id'
};

const rValue = {
    appendItem: { new_item: { desc: 'new test item insert' } },
    updateItemInItem: {
        id: 1,
        value: '015',
        description: 'test item 151'
    }
}

class AppSample extends Component {

    constructor(props) {
        super(props);

        console.log('Storage: ', Storage);

        this.state = {
            parentKey: 'web-storage-manager-sample',
            isEncoded: false,
            defaultJson: JSON.stringify(defaultJson, null, 4),
            cKeys: JSON.stringify(cKeys, null, 4),
            rValue: JSON.stringify(rValue, null, 4),
        }

        let stored = Storage.hasData(this.state.parentKey);
        if (!stored) {
            Storage.setItem(this.state.parentKey, defaultJson);
        }
    }

    handleChange(e) {
        this.setState({ defaultJson: e.target.value });
    }

    handleChange2(e) {
        this.setState({ cKeys: e.target.value });
    }

    handleChange3(e) {
        this.setState({ rValue: e.target.value });
    }

    setJSON(e) {

        let defaultJson = this.state.defaultJson;
        let val = JSON.parse(defaultJson);

        if (this.state.isEncoded) {
            Storage.setEncodeItem(this.state.parentKey, val);
        } else {
            Storage.setItem(this.state.parentKey, val);
        }
    }

    setMultiple(e) {

        let defaultJson = this.state.defaultJson;
        let val = JSON.parse(defaultJson)['Set Multiple'];

        if (this.state.isEncoded) {
            Storage.setEncodeMultiple(val);
        } else {
            console.log(`Storage.setMultiple(val): `, val);
            Storage.setMultiple(val);
        }
    }

    appendItem(e) {

        let rValue = this.state.rValue;
        let val = JSON.parse(rValue);

        Storage.appendItem(this.state.parentKey, val);
    }

    updateItemInItem(e) {

        let cKeys = this.state.cKeys;
        let cKeysObj = JSON.parse(cKeys);
        let keys = cKeysObj.keys;
        let attrib = cKeysObj.attrib;

        console.log(`attrib: ${attrib} - keys: `, keys)

        let rValue = this.state.rValue;
        let val = JSON.parse(rValue);

        console.log(`updateItemInItem: `, val)
        Storage.updateItemInItem(this.state.parentKey, keys, val, attrib);
    }

    parentKey(e) {

        this.setState({ parentKey: e.target.value });
    }

    isEncoded(e) {
        this.setState({ isEncoded: e.target.checked });
    }

    render() {

        const json = this.state.defaultJson;
        const cKeys = this.state.cKeys;
        const rValue = this.state.rValue;

        return (
            <div className="AppSample">
                {/* <label className="InputTitle"> JSON Sample: </label>
                <br /> <br /> */}
                <label className="InputSubTitle"> Parent Key: </label>
                <input className="ParentKey" value={this.state.parentKey} onChange={this.parentKey.bind(this)} />

                <label className="InputSubTitle"> Encoded: </label>
                <input className="ParentKey" type={"checkbox"} value={this.state.isEncoded} onChange={this.isEncoded.bind(this)} />

                <br /><br />
                <textarea className="InputField" value={json} onChange={this.handleChange.bind(this)} />
                <br /> <br />
                <button className={"DefaultButton"} onClick={this.setJSON.bind(this)} >
                    Set JSON
                </button>
                <br />
                <button className={"DefaultButton"} onClick={this.setMultiple.bind(this)} >
                    Set Multiple
                </button>
                <div>
                    <br />
                    <label className="InputSubTitle"> Child Keys: Must an array. Separated by ',' ex: key1, key2, key3 </label>
                    <br />
                    <textarea className="InputField2" value={cKeys} onChange={this.handleChange2.bind(this)} />
                    <br /><br />

                    <label className="InputSubTitle"> Value: Replacement value </label>
                    <br />
                    <textarea className="InputField3" value={rValue} onChange={this.handleChange3.bind(this)} />
                    <br /><br />

                    <button className={"DefaultButton"} onClick={this.appendItem.bind(this)} >
                        Append Item
                    </button>
                    <br />
                    <button className={"DefaultButton"} onClick={this.updateItemInItem.bind(this)} >
                        Update Item in Item
                    </button>
                </div>
            </div>
        );
    }
}

export default AppSample;