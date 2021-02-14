const connection = require('./connection.js');

// const orm = {
//     selectAll(whatToSelect, tableInput) {
//         const queryString = 'SELECT ?? FROM ??';
//         connection.query(queryString, [whatToSelect, tableInput], (err, result) => {
//           if (err) throw err;
//           console.log(result);
//         });
//       },

//       insertOne(table_name, column1, column2, value1, value2) {
//         const queryString = 'INSERT INTO ?? (??, ??) VALUES (??, ??)';
//         connection.query(queryString, [table_name, column1, column2, value1, value2], (err, result) => {
//           if (err) throw err;
//           console.log(result);
//         });
//       },
//       updateOne(table_name, column1, value1, condition) {
//         const queryString = 'UPDATE ?? SET ?? = ?? , WHERE ??';
//         connection.query(queryString, [table_name, column1, value1, condition], (err, result) => {
//           if (err) throw err;
//           console.log(result);
//         });
//       },
// };

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = (num) => {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  };
  
  // Helper function to convert object key/value pairs to SQL syntax
  const objToSql = (ob) => {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(`${key}=${value}`);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  };

const orm = {
    selectAll(tableInput, cb) {
      const queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    insertOne(table, cols, vals, cb) {
      let queryString = `INSERT INTO ${table}`;
  
      queryString += ' (';
      queryString += cols.toString();
      queryString += ') ';
      queryString += 'VALUES (';
      queryString += printQuestionMarks(vals.length);
      queryString += ') ';
  
      console.log(queryString);
  
      connection.query(queryString, vals, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne(table, objColVals, condition, cb) {
      let queryString = `UPDATE ${table}`;
  
      queryString += ' SET ';
      queryString += objToSql(objColVals);
      queryString += ' WHERE ';
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
  };

module.exports = orm;


