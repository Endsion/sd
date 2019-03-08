import { Subject } from 'rxjs';

let dataSource = new Subject();
var person = {
    name: "张三"
  };

  let formValues = {};

  formValues[1] = new Proxy(person, {
    set: function(obj, prop, value) {
      obj[prop] = value;
      dataSource.next(formValues);
      return true;
    }
  });
  
  formValues[2] = new Proxy(person, {
    set: function(obj, prop, value) {
      dataSource.next(formValues);
      obj[prop] = value;
    }
  });

  dataSource.subscribe((values) => {
      console.log(values);
  });
  
  proxy.name = '历史'
  console.log(person);

//   var twice = {
//     apply (target, ctx, args) {
//         console.log(...arguments);
//       return Reflect.apply(...arguments) * 2;
//     }
//   };
//   function sum (left, right) {
//       console.log(left)
//       console.log(right)
//     return left + right;
//   };
//   var proxy = new Proxy(sum, twice);
//   console.log(proxy(1, 2))
// console.log(proxy.call(null, 5, 6))
  