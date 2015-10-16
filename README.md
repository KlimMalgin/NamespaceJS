# NamespaceJS
Library for creating and managing of namespaces in JavaScript

### Example

```

NamespaceInit('Root');

Root.ns('modules.tester', {
    dbg: function(){
        console.info('::DEBUG::');
    }
});

// ... 

var testerInstance = Root.ns('modules.tester').get();

testerInstance.dbg();   // write '::DEBUG::' to console

```