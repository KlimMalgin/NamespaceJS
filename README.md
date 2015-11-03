# NamespaceJS
Library for creating and managing of namespaces in JavaScript

### Example

#### Example 1

```

NamespaceInit('Root');

Root.ns('modules.tester', {
    dbg: function(){
        console.info('::DEBUG::');
    }
});

// ... 

var testerInstance = Root.ns('modules.tester');

testerInstance.dbg();   // write '::DEBUG::' to console

```

#### Example 2

File /modules/myModule1.js

```
Root.ns('modules.myModule1', {
    startup: function () {
        // initialize function
    },
    
    dbg: function(){
        console.info('myModule1::DEBUG::');
    }
});

```

File /modules/myModule2.js

```
Root.ns('modules.myModule2', {
    startup: function () {
        // initialize function
    },
    
    method: function(){
        console.info('myModule2::DEBUG::');
    }
});

```

File /modules/main.js

```
NamespaceInit('Root');

// Initialize all modules in 'Root.modules' namespace
Root.for('modules').each(function (module) {
    module.startup();
});
```

The MIT License (MIT)
