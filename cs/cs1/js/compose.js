function compose() {
   for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
   }

   if (funcs.length === 0) {
      return function (arg) {
         return arg;
      };
   }

   if (funcs.length === 1) {
      return funcs[0];
   }

   return funcs.reduce(function (a, b) {
      return function () {
          console.log(funcs)
          console.log(b.apply(undefined, arguments))
         return a(b.apply(undefined, arguments));
      };
   });
}
function a(a){return a}
function b(a){console.log(a*a)}
compose(b,a)(3)
