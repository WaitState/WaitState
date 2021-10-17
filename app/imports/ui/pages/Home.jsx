import React from "react";
import { Meteor } from "meteor/meteor";
import papa from "papaparse";
import fs from "fs";

const Home = (props) => {
  const file = fs.createReadStream('/public/hospitalGeneralInformation.csv');
  var count = 0; // cache the running count
  var data;
  papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big file
    step: function(result) {
      // do stuff with result
    },
    complete: function(results, file) {
      console.log('parsing complete read', count, 'records.');
      data = results.data;
    },
  });
  console.log(data);

    return (
        <div>
            test
        </div>
    );
    
};

export default Home;
