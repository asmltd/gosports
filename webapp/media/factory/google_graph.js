/**
 * Created by hariharaselvam on 6/12/17.
 */
window[appName].factory('google_graph', function ($rootScope, wmslib) {
    return {
        giga_bytes: function (series_data, stacked) {


            var result = {'format': 'short', 'minValue': 0};


            var largest = 0;

            try {
                for (var i = 1; i < series_data.length; i++) {
                    var added = 0;
                    for (var j = 1; j < series_data[i].length; j++) {
                        added += series_data[i][j];
                        if (series_data[i][j] > largest) {
                            largest = series_data[i][j];

                        }
                    }
                    if (stacked == true && added > largest) {
                        largest = added;
                    }
                }

            } catch (e) {

            }


            var result = {
                ticks: [
                    {v: 0},
                    {v: largest * 0.2, f: wmslib.formatBytes(largest * 0.2)},
                    {v: largest * 0.4, f: wmslib.formatBytes(largest * 0.4)},
                    {v: largest * 0.6, f: wmslib.formatBytes(largest * 0.6)},
                    {v: largest * 0.8, f: wmslib.formatBytes(largest * 0.8)},
                    {v: largest, f: wmslib.formatBytes(largest)}
                ]
            };

            console.log(result);
            return result;

        },
        get_color_list: function () {
            return ["#ff9933", "#808080", "#9ACD32", "#FFFF00", "#F5DEB3", "#EE82EE", "#40E0D0", "#FF6347", "#D8BFD8", "#008080", "#00FF7F", "#6A5ACD", "#A0522D", "#2E8B57", "#F4A460", "#FF0000", "#663399", "#800080", "#B0E0E6", "#DDA0DD", "#CD853F", "#DB7093", "#AFEEEE", "#DA70D6", "#FF4500", "#FFA500", "#6B8E23", "#000080", "#800000", "#FF00FF", "#00FF00", "#B0C4DE", "#778899", "#20B2AA", "#D3D3D3", "#F08080", "#7CFC00", "#F0E68C", "#4B0082", "#CD5C5C", "#FF69B4", "#FFD700", "#00FFFF", "#0000FF", "#8A2BE2", "#A52A2A", "#FF7F50"];
        },
        google_color_list: function (data, type, name) {
            var keys = [];
            if (type == "pie") {

                for (i = 1; i < data.length; i++) {
                    keys.push(data[i][0]);
                }
            }
            if (type == "series") {
                keys = data[0].slice(1);
            }
            //console.log(keys);
            var colors = [];
            var available_colors = this.get_color_list();
            //console.log(available_colors);
            for (i = 0; i < keys.length; i++) {
                var color = "";
                k = 0;
                if (i < available_colors.length) {
                    k = i;
                }
                else {
                    k = i % available_colors.length;
                }
                color = available_colors[k];
                if (keys[i] == "RX") {
                    color = available_colors[0];
                }
                if (keys[i] == "TX") {
                    color = available_colors[1];
                }
                if (keys[i] == "5GHz") {
                    color = available_colors[0];
                }
                if (keys[i] == "2.4GHz") {
                    color = available_colors[1];
                }


                if (name == "cpu_pie" || name == "cpustat") {
                    if (keys[i] == "iowait") {
                        color = "#DD0000";
                    }
                    if (keys[i] == "idle") {
                        color = "#008000";
                    }
                    if (keys[i] == "system") {
                        color = "#0000DD";
                    }
                    if (keys[i] == "user") {
                        color = "#FF8000";
                    }

                }
                if (name == "controller_pie" || name == "controller_series"|| name == "switch_health_pie") {
                    if (keys[i] == "online"||keys[i] == "Online") {
                        color = available_colors[2];
                    }
                    if (keys[i] == "offline"||keys[i] == "Offline") {
                        color = available_colors[1];
                    }


                }
                if (name == "accesspoint_pie" || name == "ap_timeline") {
                    if (keys[i] == "Connected" || keys[i] == "connected") {
                        color = available_colors[2];
                    }
                    if (keys[i] == "Disconnected" || keys[i] == "disconnected") {
                        color = available_colors[1];
                    }
                }

                if (name == "controller_pie" || name == "accesspoint_pie" || name == "controller_series" || name == "ap_timeline") {
                    if (keys[i] == "Unknown" || keys[i] == "unknown") {
                        color = available_colors[0];
                    }
                }

                if (keys[i] == "Critical Required") {
                    color = available_colors[0];
                }
                if (keys[i] == "Minor Required") {
                    color = "#F5C778";
                }
                if (keys[i] == "Major") {
                    color = available_colors[0];
                }
                if (keys[i] == "Minor") {
                    color = "#F5C778";
                }
                if (keys[i] == "Up to date") {
                    color = available_colors[1];
                }
                if (keys[i] == "not_patched") {
                    color = available_colors[0];

                }
                if (keys[i] == "semi_patched") {
                    color = "#F5C778";

                }
                if (keys[i] == "fully_patched") {
                    color = available_colors[1];

                }
                colors.push(color);
            }
            return colors;

        },
        convert_timestamp: function (timestamp) {

            //return timestamp;
            var dateoff = new Date();
            var offset = dateoff.getTimezoneOffset();
            var date = new Date(timestamp + (offset * 60 * 1000));
            //console.log(date);
            return date;
            var utc_time = date.toUTCString();
            //console.log(utc_time);
            return utc_time.replace(" GMT", "");

        },
        convert_tooltip: function (data, type) {
            var new_data = {};
            var cols = [{id: "d", label: "Date", type: "datetime"}];
            for (i = 1; i < data[0].length; i++) {
                cols.push({id: data[0][i], label: data[0][i], type: "number"});
            }
            new_data['cols'] = cols;
            var rows = [];
            for (i = 1; i < data.length; i++) {
                var row = {};
                var col = [{v: data[i][0]}];
                for (j = 1; j < data[i].length; j++) {
                    if (type == "memorygraph") {
                        col.push({v: data[i][j], f: wmslib.formatBytes(data[i][j])});

                    } else {
                        col.push({v: data[i][j], f: wmslib.convert_throughput(data[i][j])})
                    }

                }
                row['c'] = col;
                rows.push(row);
            }
            new_data['rows'] = rows;
            return new_data;
        },
        series_convert: function (series) {
            var pivoted = [];
            var header = ['Datetime'];

            for (i = 0; i < series.length; i++) {
                header.push(series[i]['name']);
            }
            //header.push('tooltip');
            pivoted.push(header);
            if (header.length > 1) {
                for (i = 0; i < series[0]['data'].length; i++) {
                    var row = [this.convert_timestamp(series[0]['data'][i][0])];
                    for (j = 0; j < series.length; j++) {
                        row.push(series[j]['data'][i][1])
                    }
                    //row.push("my tooltip");
                    //console.log(row);
                    pivoted.push(row);
                    //console.log(pivoted);
                }

            }
            //console.log(pivoted);
            return pivoted
        },
        series_landing: function (stacked, colors, type, format) {
            var options = {

                'isStacked': stacked,
                'seriesType': type,
                'focusTarget': 'category',

                'colors': colors,
                'legend': {'position': 'bottom'},
                'vAxis': format,
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    }

                },
                'backgroundColor': 'transparent',
                'areaOpacity': 10,

                'chartArea': {'left': 55, 'right': 15, 'top': 15, 'bottom': 35},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                },
                'animation': {
                    'duration': 1200,
                    'easing': 'linear',
                    'startup': true
                }
            };
            return options;
        },
        series_popup: function (title, stacked, colors, type, format) {
            var options = {
                'title': title,
                'isStacked': stacked,
                'seriesType': type,
                'focusTarget': 'category',
                'width': 900,
                'height': 300,
                'colors': colors,
                'legend': {'position': 'none'},
                'vAxis': format,
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    }
                },
                'areaOpacity': 10,
                'chartArea': {'left': 55, 'right': 15, 'top': 25, 'bottom': 45},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                },
                'animation': {
                    'duration': 1200,
                    'easing': 'linear',
                    'startup': true
                }

            };
            return options;
        },
        anomaly_lines: function (series) {
            var lines = {};
            var size = series.length;
            for (i = 0; i < size - 1; i++) {
                lines[i] = {'type': 'area', 'areaOpacity': 10};
            }
            lines[size - 1] = {'type': 'line'};
            lines[size] = {'type': 'line', 'lineDashStyle': [4, 4], visibleInLegend: false};

            return lines;
        },
        anomaly_colors: function (series) {
            var colors = [];
            var size = series.length;
            var all_colors = this.get_color_list();

            for (i = 0; i < size - 1; i++) {
                if (all_colors[i] == "#FF0000") {
                    continue;
                }
                colors.push(all_colors[i]);
            }
            colors.push("#FF0000");
            colors.push("#FF0000");
            return colors;
        },
        anomaly_convert: function (series, sensitivity) {
            var pivoted = [];
            var header = ['Datetime'];

            for (i = 0; i < series.length; i++) {
                header.push(series[i]['name']);
            }
            header.push("");
            pivoted.push(header);
            if (header.length > 1) {
                for (i = 0; i < series[0]['data'].length; i++) {
                    var row = [this.convert_timestamp(series[0]['data'][i][0])];
                    for (j = 0; j < series.length; j++) {
                        row.push(series[j]['data'][i][1])
                    }
                    row.push(sensitivity);
                    //console.log(row);
                    pivoted.push(row);
                    //console.log(pivoted);
                }

            }
            //console.log(pivoted);
            return pivoted
        },
        anomaly_landing: function (colors, lines, stacked) {
            var options = {


                'focusTarget': 'category',
                'isStacked': stacked,
                'colors': colors,
                'legend': {'position': 'bottom'},
                'vAxis': {'format': 'short'},
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    },

                },

                'series': lines,
                'areaOpacity': 10,
                'chartArea': {'left': 35, 'right': 15, 'top': 15, 'bottom': 30},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                }
            };
            return options;
        },
        anomaly_popup: function (title, colors, lines, stacked) {
            var options = {
                'title': title,
                'isStacked': stacked,
                'focusTarget': 'category',
                'width': 900,
                'height': 300,
                'colors': colors,
                'legend': {'position': 'none'},
                'vAxis': {'format': 'short'},
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    },

                },

                'series': lines,

                'chartArea': {'left': 35, 'right': 15, 'top': 25, 'bottom': 30},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                }
            };
            return options;
        },
        combo_landing: function (colors) {
            var options = {


                'focusTarget': 'category',
                'isStacked': false,
                'colors': colors,
                'legend': {'position': 'bottom'},
                'vAxis': {'format': 'short'},
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    },

                },
                'curveType': 'function',
                'series': {
                    0: {'type': 'area', 'areaOpacity': 10},
                    1: {'type': 'area', 'areaOpacity': 10},
                    2: {'type': 'line', 'targetAxisIndex': 1},
                    3: {'type': 'line', 'targetAxisIndex': 1}
                },
                'areaOpacity': 10,
                'chartArea': {'left': 45, 'right': 35, 'top': 15, 'bottom': 30},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                }
            };
            return options;
        },
        combo_popup: function (title, colors) {
            var options = {
                'title': title,
                'isStacked': false,
                'focusTarget': 'category',
                'width': 900,
                'height': 300,
                'colors': colors,
                'legend': {'position': 'none'},
                'vAxis': {'format': 'short'},
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    },

                },
                'curveType': 'function',
                'series': {
                    0: {'type': 'area', 'areaOpacity': 10},
                    1: {'type': 'area', 'areaOpacity': 10},
                    2: {'type': 'line', 'targetAxisIndex': 1},
                    3: {'type': 'line', 'targetAxisIndex': 1}
                },
                'chartArea': {'left': 45, 'right': 35, 'top': 25, 'bottom': 30},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                }
            };
            return options;
        },
        histogram_convert: function (series) {
            var pivoted = [['Datetime', 'Days']];


            for (i = 0; i < series.result.length; i++) {


                pivoted.push([series.result[i].name, series.result[i].y]);

            }


            return pivoted
        },
        histogram_landing: function () {
            var options = {


                'seriesType': 'histogram',


                'colors': ['grey', 'orange'],
                'legend': {'position': 'bottom'},
                'vAxis': {'format': 'short'},
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    },

                },

                'areaOpacity': 10,

                'chartArea': {'left': 35, 'right': 15, 'top': 15, 'bottom': 35},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                }
            };
            return options;
        },
        histogram_popup: function (title) {
            var options = {
                'title': title,

                'seriesType': 'Histogram',

                'width': 900,
                'height': 300,
                'colors': ['grey', 'orange'],
                'legend': {'position': 'none'},
                'vAxis': {'format': 'short'},
                'hAxis': {
                    'gridlines': {
                        'color': 'transparent'
                    },

                },
                'areaOpacity': 10,
                'chartArea': {'left': 35, 'right': 15, 'top': 25, 'bottom': 40},
                'explorer': {
                    'actions': ['dragToZoom', 'rightClickToReset'],
                    'axis': 'horizontal',
                    'keepInBounds': true,
                    'maxZoomIn': 4.0
                }
            };
            return options;
        },
        column_chart_convert: function (series) {
            var data = series.result;

            var result = [['Element', 'Days', {role: 'style'}]];
            for (i = 0; i < data.length; i++) {
                result.push([data[i].name, data[i].y, data[i].color])
            }
            return result;

        },
        column_chart_landing: function () {
            var result = {
                'legend': {'position': 'bottom'},
                'colors': ['grey'],
                'chartArea': {'left': 35, 'right': 15, 'top': 15, 'bottom': 30}
            };
            return result;

        },
        column_chart_popup: function (title) {
            var result = {
                'title': title,
                'legend': {'position': 'bottom'},
                'width': 900,
                'height': 300,
                'colors': ['grey'],
                'chartArea': {'left': 55, 'right': 15, 'top': 15, 'bottom': 35}
            };
            return result;
        },

        convert_pie_data: function (series) {
            var data = [];
            data.push(['Key', 'Doc count']);
            for (i = 0; i < series.result.length; i++) {
                if(series.result[i]['doc_count']!=0){
                    data.push([series.result[i]['key'], series.result[i]['doc_count']]);
                }
            }
            console.log(data);
            return data;
        },
        pie_landing: function (colors) {
            var options = {
                'focusTarget': 'category',
                'colors': colors,
                'is3D': true,
                'legend': {position: 'bottom'},
                'chartArea': {left: 35, right: 15, top: 15, bottom: 30},
                backgroundColor: {fill: 'transparent'}

            };
            return options;

        },
        pie_popup: function (title, colors) {
            var options = {
                'title': title,
                'focusTarget': 'category',
                'width': 900,
                'height': 600,
                'colors': colors,
                'is3D': true,
                'legend': {position: 'none'},
                'chartArea': {left: 35, right: 15, top: 25, bottom: 30}

            };
            return options;


        },
        geo_graph_data: function (series) {
            var data = [['Locale', 'Controller']];
            for (i = 0; i < series.result.length; i++) {
                if (series.result[i]['key'] == "Private") {
                    continue;
                }
                data.push([series.result[i]['key'], series.result[i]['doc_count']]);
            }

            return data;
        },
        geo_graph_options: function () {
            var options = {


                'chartArea': {left: 10, top: 10, bottom: 0, height: "100%"},
                'colorAxis': {colors: ['#aec7e8', '#1f77b4']},
                'displayMode': 'regions',
                'explorer': {
                    actions: ['dragToZoom', 'rightClickToReset'],
                    axis: 'horizontal',
                    keepInBounds: true,
                    maxZoomIn: 8.0
                }
            };
            return options;

        },
        geo_graph_options_pop: function (title) {
            var options = {

                'title': title,
                'width': 900,
                'height': 600,
                'chartArea': {left: 10, top: 25, bottom: 0, height: "100%"},
                'colorAxis': {colors: ['#aec7e8', '#1f77b4']},
                'displayMode': 'regions',
                'explorer': {
                    actions: ['dragToZoom', 'rightClickToReset'],
                    axis: 'horizontal',
                    keepInBounds: true,
                    maxZoomIn: 8.0
                }
            };
            return options;

        },
        gauge_formate: function (numerator, denominator) {
            var numeric = 0;
            if (denominator > 0) {
                var percentage = wmslib.percentage(numerator, denominator);
                numeric = parseFloat(percentage);
            }
            var textual = numeric.toString() + " %";
            return {v: numeric, f: textual};
        },
        gauge_options: function () {
            var options = {

                'redFrom': 90,
                'redTo': 100,
                'yellowFrom': 75,
                'yellowTo': 90,
                'minorTicks': 5,
                'animation': {
                    'duration': 1200
                },
                'max': 100,
                'min': 0
            };
            return options;

        },
        gauge_options_pop: function (title) {
            var options = {
                'title': title,
                'width': 900,
                'height': 600,
                'redFrom': 90,
                'redTo': 100,
                'yellowFrom': 75,
                'yellowTo': 90,
                'minorTicks': 5,
                'animation': {
                    'duration': 1200
                },
                'max': 100,
                'min': 0

            };
            return options;

        },

        Configurations: function (type, series, sensitivity) {

            var data = [];
            var stacked = false;
            var colors = [];
            var ctype = "";
            var title = "";
            var vaxis = {'format': 'short', 'minValue': 0};
            var lines = {
                0: {'type': 'area', 'areaOpacity': 10},
                1: {'type': 'line'},
                2: {'type': 'line', 'lineDashStyle': [4, 4], visibleInLegend: false}
            };
            switch (type) {
                case 'throughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Throughput";
                    vaxis = "bytes";
                    break;
                case 'athroughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Aggregate Throughput";
                    vaxis = "bytes";
                    break;
                case 'dthroughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Data Throughput";
                    vaxis = "bytes";
                    break;
                case 'ethroughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "EstThroughput";
                    vaxis = "bytes";
                    break;
                case 'mthroughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Management Throughput";
                    vaxis = "bytes";
                    break;
                case 'ithroughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Throughput";
                    vaxis = "bytes";
                    break;
                case 'tthroughput':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Total Throughput";
                    vaxis = "bytes";
                    break;
                case 'throughputperue':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Average Throughput per Session";
                    vaxis = "bytes";
                    break;
                case 'packets':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Packets";
                    break;
                case 'drops':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Drops";
                    break;
                case 'errors':
                    ctype = "AreaChart";
                    stacked = false;
                    title = "Errors";
                    break;
                case 'clientsessions_db':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Client Sessions";
                    break;
                case 'ap_timeline':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'memorygraph':
                    var m_series = [];

                    for (i = 0; i < series.length; i++) {
                        if (series[i]["name"] != "total" && series[i]["name"] != "Total") {
                            m_series.push(series[i]);
                        }
                    }


                    if (m_series.length == 2) {
                        series = [m_series[1], m_series[0]];

                    }
                    vaxis = "bytes";
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'cpustat':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'controller_series':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'clientsessions':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'event_series':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'datalake_series':
                    ctype = "AreaChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'datalake_time_series':
                    ctype = "LineChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'switch_health_series':
                    ctype = "LineChart";
                    stacked = true;
                    title = "Timeline";
                    break;
                case 'switch_health_pie':
                    ctype = "PieChart";
                    title = "Distribution";
                    break;
                case 'ap_pie':
                    ctype = "PieChart";
                    title = "Access Points";
                    break;
                case 'cont_pie':
                    ctype = "PieChart";
                    title = "Controllers by Country";
                    break;
                case 'os_pie':
                    ctype = "PieChart";
                    title = "Operating Systems";
                    break;
                case 'cont_geo':
                    ctype = "GeoChart";
                    data = this.geo_graph_data(series);
                    title = "Geo Distribution of Controllers";
                    break;
                case 'accesspoint_pie':
                    ctype = "PieChart";
                    title = "Distribution";
                    break;
                case 'controller_pie':
                    ctype = "PieChart";
                    series = {"result": series};
                    title = "Distribution";
                    break;
                case 'clientsessions_pie':
                    ctype = "PieChart";
                    series = {"result": series};
                    title = "Distribution";
                    break;
                case 'datalake_pie':
                    ctype = "PieChart";
                    title = "Distribution";
                    break;
                case 'event_pie':
                    ctype = "PieChart";
                    title = "Distribution";
                    break;
                case 'cpu_pie':
                    ctype = "PieChart";
                    title = "CPU Usage";
                    var mydata = [];
                    var keys = Object.keys(series);
                    for (i = 0; i < keys.length; i++) {
                        mydata.push({"key": keys[i], "doc_count": series[keys[i]]})
                    }
                    series = {"result": mydata};
                    break;
                case 'cpu_speedo':
                    ctype = "Gauge";
                    var cpu_value = (series['1'] + series['15'] + series['5']) / 3;

                    data = [['Label', 'Value'], ["CPU Load", this.gauge_formate(cpu_value, series['count'])]];
                    title = "Distribution";
                    break;
                case 'memory_speedo':
                    ctype = "Gauge";


                    if (series instanceof Array) {
                        series = series[0];
                    }

                    data = [['Label', 'Value'], ["Memory", this.gauge_formate(series.used, series.total)]];
                    title = "Memory Usage";
                    break;
                case 'disk_speedo':
                    ctype = "Gauge";
                    data = [['Label', 'Value']];
                    for (i = 0; i < series.length; i++) {
                        data.push([series[i]['mount'], this.gauge_formate(series[i].used, series[i].size)]);

                    }
                    title = "Disk Usage";
                    break;
                case 'cpuload':
                    title = "CPU Load";
                    ctype = "LineChart";
                    break;
                case 'diskgraph':
                    title = "Timeline";
                    ctype = "LineChart";
                    break;
                case 'airtime':
                    ctype = "LineChart";
                    title = "AirTime";
                    break;
                case 'associations':
                    ctype = "LineChart";
                    title = "Associations";
                    break;
                case 'channelchanges':
                    ctype = "LineChart";
                    title = "Channel Changes";
                    break;
                case 'radiobusy':
                    ctype = "LineChart";
                    title = "Busy State";
                    break;
                case 'noisefloor':
                    ctype = "LineChart";
                    title = "Noise Floor";
                    break;
                case 'channels':
                    ctype = "LineChart";
                    title = "Active Channels";
                    break;
                case 'rssi':
                    ctype = "LineChart";
                    title = "RSSI";
                    break;
                case 'frame1':
                    var frames = [];
                    for (i = 0; i < series.length; i++) {
                        if (series[i].name == 'TX Frames' || series[i].name == 'RX Frames' || series[i].name == 'RX Management Frames' || series[i].name == 'TX Management Frames') {
                            frames.push(series[i]);

                        }
                    }
                    series = frames;
                    ctype = "LineChart";
                    title = "Frames";
                    break;
                case 'frame2':
                    var frames = [];
                    for (i = 0; i < series.length; i++) {
                        if (series[i].name == 'RX CRC Frame Errors' || series[i].name == 'TX Dropped Frames' || series[i].name == 'TX Management Dropped Frames') {
                            frames.push(series[i]);

                        }
                    }
                    series = frames;
                    ctype = "LineChart";
                    title = "Frames ( Error )";
                    break;
                case 'anomalyrx':
                    colors = ["#ff9933", "#FF0000", "#FF0000"];
                    ctype = "anomaly";
                    title = "Anomalies (RX)";
                    break;
                case 'anomalytx':
                    colors = ["#6E6E6E", "#FF0000", "#FF0000"];
                    ctype = "anomaly";
                    title = "Anomalies (TX)";
                    break;
                case 'anomalyld':
                    colors = ["#6E6E6E", "#FF0000", "#FF0000"];
                    ctype = "anomaly";
                    title = "Anomalies (Load)";
                    stacked = false;
                    break;
                case 'anomalydb':
                    colors = ["#6E6E6E", "#FF0000", "#FF0000"];
                    ctype = "anomaly";
                    title = "Throughput";
                    stacked = false;
                    break;
                case 'anomalyues':
                    colors = ["#6E6E6E", "#ff9933", "#FF0000", "#FF0000"];
                    ctype = "anomaly";
                    title = "Anomaly UES";
                    lines = {
                        0: {'type': 'line'},
                        1: {'type': 'line'},
                        2: {'type': 'line'},
                        3: {'type': 'line', 'lineDashStyle': [4, 4], visibleInLegend: false}
                    };

                    stacked = false;
                    break;
                case 'anomalyevents':
                    colors = this.anomaly_colors(series);
                    ctype = "anomaly";
                    title = "Anomaly Events";
                    lines = this.anomaly_lines(series);
                    console.log(lines);
                    stacked = true;
                    break;
                case 'throughputues':
                    ctype = "comboChart";
                    title = "Throughput vs Sessions";
                    break;
                case 'clientsessions_ass':
                    ctype = "comboChart";
                    title = "Client Sessions vs Associations";
                    break;
                case 'histogram':
                    ctype = "histogram";
                    title = "Uptime";
                    break;
                case 'timeline':
                    ctype = "timeline";
                    title = "Uptime";
                    break;

                case 'uptime':
                    ctype = "columnChart";
                    title = "Uptime";
                    break;

            }
            var config = {};
            var config_pop = {};
            var no_data = false;
            switch (ctype) {
                case 'LineChart':
                    data = this.series_convert(series);
                    if (data.length == 1) {
                        no_data = true;
                    }
                    if (vaxis == "bytes") {
                        vaxis = this.giga_bytes(data);
                    }
                    colors = this.google_color_list(data, "series", type);
                    config = {
                        'type': ctype,
                        'data': data,
                        'options': this.series_landing(stacked, colors, 'line', vaxis)
                    };
                    config_pop = {
                        'type': ctype,
                        'data': data,
                        'options': this.series_popup(title, stacked, colors, 'line', vaxis)
                    };
                    break;
                case 'AreaChart':
                    data = this.series_convert(series);
                    if (data.length == 1) {
                        no_data = true;
                    }
                    colors = this.google_color_list(data, "series", type);

                    if (vaxis == "bytes") {
                        vaxis = this.giga_bytes(data, stacked);
                        data = this.convert_tooltip(data, type);
                    }


                    config = {
                        'type': ctype,
                        'data': data,
                        'options': this.series_landing(stacked, colors, 'area', vaxis)
                    };
                    config_pop = {
                        'type': ctype,
                        'data': data,
                        'options': this.series_popup(title, stacked, colors, 'area', vaxis)
                    };
                    break;
                case 'PieChart':
                    data = this.convert_pie_data(series);
                    if (data.length == 1) {
                        no_data = true;
                    }
                    colors = this.google_color_list(data, "pie", type);
                    config = {'type': ctype, 'data': data, 'options': this.pie_landing(colors)};
                    config_pop = {'type': ctype, 'data': data, 'options': this.pie_popup(title, colors)};
                    break;
                case 'GeoChart':
                    config = {'type': ctype, 'data': data, 'options': this.geo_graph_options()};
                    config_pop = {'type': ctype, 'data': data, 'options': this.geo_graph_options_pop(title)};
                    break;
                case 'Gauge':
                    config = {'type': ctype, 'data': data, 'options': this.gauge_options()};
                    config_pop = {'type': ctype, 'data': data, 'options': this.gauge_options_pop(title)};
                    break;
                case 'anomaly':
                    data = this.anomaly_convert(series, sensitivity);
                    config = {
                        'type': "ComboChart",
                        'data': data,
                        'options': this.anomaly_landing(colors, lines, stacked)
                    };
                    config_pop = {
                        'type': "ComboChart",
                        'data': data,
                        'options': this.anomaly_popup(title, colors, lines, stacked)
                    };
                    break;
                case 'comboChart':
                    data = this.series_convert(series);
                    colors = this.google_color_list(data, "series", type);
                    config = {'type': "ComboChart", 'data': data, 'options': this.combo_landing(colors)};
                    config_pop = {'type': "ComboChart", 'data': data, 'options': this.combo_popup(title, colors)};
                    break;
                case 'histogram':
                    data = this.histogram_convert(series);
                    config = {'type': 'Histogram', 'data': data, 'options': this.histogram_landing()};
                    config_pop = {'type': 'Histogram', 'data': data, 'options': this.histogram_popup(title)};
                    break;

                case 'columnChart':
                    data = this.column_chart_convert(series);
                    config = {'type': 'ColumnChart', 'data': data, 'options': this.column_chart_landing()};
                    config_pop = {'type': 'ColumnChart', 'data': data, 'options': this.column_chart_popup(title)};
                    break;
            }


            return [config, config_pop, title, ctype, no_data];


        }

    }

});
