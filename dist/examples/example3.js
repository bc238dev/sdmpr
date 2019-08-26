"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This example demonstrates the collect method
const SimpleDataMapper_1 = require("../SimpleDataMapper");
const log = (msg, obj) => {
    console.log(msg, JSON.stringify(obj, null, 2));
};
const data1 = {
    first_name: "Pixie", last_name: "Dorry", age: 3, gender: "F",
    addresses: [
        {
            street: "123 Str",
            city_name: "San Diego",
            state_name: "CA",
            postal_code: "92120"
        }
    ]
};
const mapper1 = SimpleDataMapper_1.SimpleDataMapper.create()
    .collect(["first_name", "last_name"], "fullName1")
    .collect(["first_name", "last_name"], (data) => {
    // You have full control here!
    return {
        fullName2: `${data[0]} ${data[1] && data[1].toUpperCase()}`,
        extra: {
            info: "Just shows that you can add anything if you like!",
            now: new Date()
        }
    };
});
const transformedData1 = mapper1.transform(data1);
log("Data1->", data1);
log("TransformedData1->", transformedData1);
/*
Sample Output:

TransformedData1-> {
  "fullName1": "Pixie Dorry",
  "fullName2": "Pixie DORRY",
  "extra": {
    "info": "Just shows that you can add anything if you like!",
    "now": "2019-08-26T06:35:12.397Z"
  }
}
*/
