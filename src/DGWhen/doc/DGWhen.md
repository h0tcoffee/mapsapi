## L.DG.when

`L.DG.when()` может сделить за promise которые предоставляют из себя любой обьект с методом `.then()`, тоесть даже promise которые не соотвествуют спецификации Promises/A, например jQuery's Deferred. Он будет превращать такие promise в Promises/A.

Другими словами, `L.DG.when()` будет всегда возвращать безопасный promise, который полностью соответсвует спецификации Promises/A.

#### Смотрите так же
* [Здесь мы можете прочитать более подробно про when()](https://github.com/cujojs/when/wiki/when)

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.when</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue, &lt;Callback&gt; onFulfilled?, &lt;Callback&gt; onRejected?, &lt;Callback&gt; onProgress?)</code></td>

        <td>
            <code>L.DG.when(&hellip;)</code>
        </td>

        <td>
            Мы имеем возможность отслеживать promise или непосредственно значение переменной.<br/>
            Если <code>promiseOrValue</code> представляет собой значение переменной, то <code>onFulfilled</code> будет выполнена с этим значением, и по умолчанию вернёт promise.<br/>
            Если в <code>promiseOrValue</code> передан promise, то:
            <ul>
                <li><code>onFulfilled</code> будет вызван с значением которое вернёт <code>promiseOrValue</code> после того как он отработает, или</li>
                <li><code>onRejected</code> будет вызван когда <code>promiseOrValue</code> получит статус rejected.</li>
                <li><code>onProgress</code> будет вызван любым обновлением в <code>promiseOrValue</code>.</li>
            </ul>
        </td>
    </tr>
</table>

### Методы

**Класс L.DG.When**

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>promise</b>(<a href="#promise-resolver">&lt;Resolver&gt;</a> resolver)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <a href="#promise"><code>promise</code></a> с обьектом поведения <a href="#promise-resolver"><code>Resolver</code></a>
        </td>
    </tr>
    <tr>
        <td><code><b>resolve</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <code><a href="#promise">promise</a></code> с <code>resolved</code> статусом.

        If promiseOrValue is a value, it will be the resolution value of the returned promise. Returns promiseOrValue if it's a trusted promise. If promiseOrValue is a foreign promise, returns a promise in the same state (resolved or rejected) and with the same value as promiseOrValue.</td>
    </tr>
    <tr>
        <td><code><b>reject</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <code><a href="#promise">promise</a></code> с <code>rejected</code> статусом.

        If promiseOrValue is a value, it will be the rejection value of the returned promise. If promiseOrValue is a promise, its completion value will be the rejected value of the returned promise.</td>
    </tr>
    <tr>
        <td><code><b>defer</b>()</code></td>
        <td><code>Deferred: {promise, <a href="#promise-resolver">resolver</a>}</code></td>
        <td>Создаёт обьект <code>{promise, <a href="#promise-resolver">resolver</a>}</code> который ещё называют <code>Deferred</code>. В некоторых случаях бывает удобно иметь доступ, через один обьект, к <a href="#promise"><code>promise</code></a> и его набору поведенчиских? функций.</td>
    </tr>
    <tr>
        <td><code><b>isPromiseLike</b>(&lt;Object&gt; anything)</code></td>
        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code> если у обьекта или функции <code>anything</code> есть метод <code>then()</code>.</td>
    </tr>
</table>

### Вспомогательные обьекты

<table>
    <tr>
        <th>Имя</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr id="promise-or-value">
        <td><code><b>promiseOrValue</b></code></td>
        <td><code>Promise | anything</code></td>
        <td>Любое значение, либо безопасный <code><a href="#promise">promise</a></code> (обьект у которого есть метод <code>then()</code>)</td>
    </tr>
    <tr id="promise">
        <td><code><b>Promise</b></code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td><a href="#promise"><code>Promise</code></a> представляет собой конечный результат, который имеет условный статус <code>resolved</code> или <code>rejected</code>. В первом случае результатом <a href="#promise"><code>promise</code></a> будет полученное значение, а во втором причина <code>rejected'a</code>.
        Так же <a href="#promise"><code>promise</code></a> предоставляет интерфейс для вызова функции с его результатом (значение, или причина <code>rejected'a</code>) и создаёт новый <a href="#promise"><code>promise</code></a> для результата.</td>
    </tr>
    <tr id="promise-resolver">
        <td><code><b>resolver</b></code></td>
        <td><code><b>Function</b>(&lt;Callback&gt; resolve, &lt;Callback&gt; reject, &lt;Callback&gt; notify)</code></td>
        <td>Функция которая выполняет определённый набор действий (возможно асинхронных) и в конце своей работы вызывает либо <code>resolve</code> передавая в него результат работы, либо <code>reject</code> и передаёт в него причину отказа работы. Так же во время работы возможно использование <code>notify</code> для передачи в него текущего статуса выполнения работы.</td>
    </tr>
</table>