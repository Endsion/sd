import { Subject } from 'rxjs';

let dataSource = new Subject();
var person = {
    name: '张三'
};
let formValues = {};
formValues = new Proxy(person, {
    set: function(obj, prop, value) {
      obj[prop] = value;
      dataSource.next(formValues);
      return true;
    }
});
dataSource.subscribe((values) => {
    console.log(values);
});

formValues.name = '历史';
console.log(formValues);