


(function (global) {
    
    /**
     * Модуль для работы с неймспейсами прибожения
     */
    
    var _lastSelectedPath = "";
    var _lastSelectedParent = null;
    var _lastSelectedIndex = "";
    
    function Namespace () {}
    
    /**
     * Установит для последующей обработки значение указанное в path. Если заданного path 
     * не существует - он будет создан и в последнем элементе будет помещен пустой объект. 
     * Этот объект будет возвращен в качестве результата.
     * @param {String} path Путь из которого нужно извлечь результат
     * @method selectPath
     * @for Namespace
     */
    Namespace.prototype.selectPath = function (path) {
    	var pathItems = path.split("."),
            ln = pathItems.length-1,
            parent = this,
            result = {};
    
        for (var i = 0; i <= ln; i++) {
            if (!parent[pathItems[i]] && i == ln) {
                parent[pathItems[i]] = {};
                _lastSelectedPath = path;
                _lastSelectedParent = parent;
                _lastSelectedIndex = pathItems[i];
            } else
            if (!parent[pathItems[i]]) {
                parent[pathItems[i]] = {};
            } else
            if (parent[pathItems[i]]) {
                _lastSelectedPath = path;
                _lastSelectedParent = parent;
                _lastSelectedIndex = pathItems[i];
            }
            parent = parent[pathItems[i]];
        }
    };
    
    /**
     * Вернет значение по последнему заданному path
     * @private
     * @return {Any} Значение, указанное в текущем path
     * @method getLastSelectedValue
     * @for Namespace
     */
    function getLastSelectedValue () {
    	return _lastSelectedParent[_lastSelectedIndex];
    }
    
    /**
     * Сохранит значение по последнему заданному path
     * @private
     * @param {Any} value Значение, которое нужно сохранить
     * @method setValueForSelectedPath
     * @for Namespace
     */
    function setValueForSelectedPath (value) {
    	_lastSelectedParent[_lastSelectedIndex] = value;
    }
    
    /**
     * Метод для удобного создания неймспейсов. Создаст неймспейс и установит для него указанное значение.
     * Если значение не указано - вернет значение из неймспейса, либо пустой объект.
     * @example
     *     App.ns('Auth.AuthFormBlock', MyAuthFormBlock);
     *     App.ns('Config');
     * @param {String} ns Неймспейс, который нужно создать
     * @param {Any} value Любое значение, кторое должно быть размещено по пути указанному в неймспейсе. Например, конструктор или объект с методами
     * @method ns
     * @for Namespace
     * @chainable
     */
    Namespace.prototype.ns = function (/*ns, value*/) {
        // Задан только первый аргумент(path) - вернем значение по указанному path
        if (arguments.length == 1) {
            this.selectPath(arguments[0]);
            return this.get();
        } else
        // Задан path и значение для него. Установим это значение и вернем его же.
        if (arguments.length == 2) {
            this.selectPath(arguments[0]);
            value && setValueForSelectedPath(arguments[1]);
            return this.get();
        }
        return {};
    };
    
    /**
     * Установит неймспейс для дальнейшей работы с ним
     * @example
     *     App.for('Auth.AuthFormBlock').each(function () {...});
     */
    Namespace.prototype.for = function (ns) {
        this.selectPath(ns);
        return this;
    };
    
    /**
     * Метод выполнит перебор всех элементов path, который был заранее задан через метод ns.
     * На каждом элементе выполнит функцию fn, переданную в качестве параметра.
     * В вызываемую функцию передатс сам элемент и его индекс.
     * @param {Function} fn Функция, которая будет примерена к каждому элементу текущего path
     * @method each
     * @for Namespace
     * @chainable
     */
    Namespace.prototype.each = function (fn) {
    	var val = getLastSelectedValue();
    	for (var key in val) {
    		if (!val.hasOwnProperty(key)) continue;
    		fn.call({}, val[key], key);
    	}
    	return this;
    };
    
    /**
     * Вернет значение расположенное по текущему установленному path.
     * @method get
     * @for Namespace
     * @return {Any} Значение расположенное по текущему path
     */
    Namespace.prototype.get = function () {
    	return getLastSelectedValue();
    };


    /**
     * Create root namespace with baseNamespase name. Or App name by default. 
     */
    global.NamespaceInit = function (baseNamespase) {
        baseNamespase = baseNamespase || 'App';
        global[baseNamespase] = new Namespace();
        delete global.NamespaceInit;
    };    
    
})(this);

