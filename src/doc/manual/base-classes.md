## Базовые классы

{toc}

### Описание

В данном разделе описаны базовые классы, которые часто встречаются на страницах руководства API карт и необходимы для работы с многими объектами карты.

### Класс DG.LatLng

Географическая точка с определенной широтой и долготой.

    var latlng = DG.latLng(54.98, 82.89);

Все методы, которые принимают объекты LatLng также принимают широту и долготу в виде простого массива или объекта, то есть данные записи эквивалентны:

    map.panTo(DG.latLng(54.98, 82.89));
    map.panTo([54.98, 82.89]);
    map.panTo({lng: 82.89, lat: 54.98});
    map.panTo({lat: 54.98, lng: 82.89});

#### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code><b>DG.LatLng</b>(
                &lt;Number&gt; <i>latitude</i>,
                &lt;Number&gt; <i>longitude</i>,
                &lt;Number&gt; <i>altitude?</i> )</code>
            </td>
            <td>
                <code>DG.latLng(…)</code>
                <code>DG.latLng([…])</code>
            </td>
            <td>Создает объект, представляющий географическую точку с определенной широтой и долготой (и опционально высотой).</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>lat</b></code></td>
            <td><code>Number</code></td>
            <td>Широта в градусах.</td>
        </tr>
        <tr>
            <td><code><b>lng</b></code></td>
            <td><code>Number</code></td>
            <td>Долгота в градусах.</td>
        </tr>
    </tbody>
</table>

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает расстояние (в метрах) до переданной широты и долготы, рассчитывается по формуле Haversine. См. <a target="_blank" href="http://en.wikipedia.org/wiki/Haversine_formula">описание в Wikipedia</a></td>
        </tr>
        <tr>
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если переданная широта и долгота находится в той же позиции (с небольшой погрешностью).</td>
        </tr>
        <tr>
            <td><code><b>toString</b>()</code></td>
            <td><code>String</code></td>
            <td>Возвращает строковое представление точки (для отладки).</td>
        </tr>
    </tbody>
</table>

#### Константы

<table>
    <thead>
        <tr>
            <th>Константа</th>
            <th>Тип</th>
            <th>Значение</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DEG_TO_RAD</b></code></td>
            <td><code>Number</code></td>
            <td><code>Math.PI / 180</code></td>
            <td>Коэффициент для конвертации градусов в радианы.</td>
        </tr>
        <tr>
            <td><code><b>RAD_TO_DEG</b></code></td>
            <td><code>Number</code></td>
            <td><code>180 / Math.PI</code></td>
            <td>Коэффициент для конвертации радиан в градусы.</td>
        </tr>
        <tr>
            <td><code><b>MAX_MARGIN</b></code></td>
            <td><code>Number</code></td>
            <td><code>1.0E-9</code></td>
            <td>Максимальная погрешность для проверки равенства.</td>
        </tr>
    </tbody>
</table>