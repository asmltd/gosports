/**
 * Created by hariharaselvam on 11/10/16.
 */
window[appName].factory('wmslib', function () {
    return {
        convert_throughput: function (rate) {
            /* A Factory to convert throughput to human readable form */
            /* Tx or Rx Rates to Bits per seconds */
            if (rate == -1) {
                rate = 0;
            }
            if (rate >= 1000000) {
                rate = rate / 1000000;
                rate = Math.round(rate * 100) / 100;
                rate = rate.toString() + " MBit/s"
            }
            else if ((rate >= 1000) && (rate < 1000000)) {
                rate = rate / 1000;
                rate = Math.round(rate * 100) / 100;
                rate = rate.toString() + " KBit/s"
            }
            else {
                rate = Math.round(rate * 100) / 100;
                rate = rate.toString() + " bits/s"
            }

            return rate;


        },
        uptime_convertion: function (seconds) {
            /* A Factory to convert uptime to human readable form */
            /* Seconds to Day : hour : minutes : */
            if (seconds == 1 || seconds == 0) {
                return seconds.toString() + " Second";
            }

            var uptime = "unknown";
            var uptime_array = [];
            if (seconds >= 86400) {

                days = parseInt(seconds / 86400);

                value = days.toString() + " Days";
                seconds = seconds % 86400;
                uptime_array.push(value);
            }

            if (seconds >= 3600) {
                hours = parseInt(seconds / 3600);

                value = hours.toString() + " Hours";
                seconds = seconds % 3600;
                uptime_array.push(value);
            }

            if (seconds >= 60) {
                minutes = parseInt(seconds / 60);

                value = minutes.toString() + " Minutes";
                seconds = seconds % 60;
                uptime_array.push(value);
            }
            if (seconds >= 0) {
                seconds = parseInt(seconds);
                value = seconds.toString() + " Seconds";
                uptime_array.push(value);
            }


            if (uptime_array.length == 0) {
                return "UNKNOWN";
            }
            if (uptime_array.length == 1) {
                uptime = uptime_array[0];
            }
            else {
                uptime = uptime_array[0] + " " + uptime_array[1];
            }
            return uptime;

        },
        log_plt: function (action, response) {
            if (response.hasOwnProperty("plt")) {
                console.log(action + "  =  " + response["plt"].toString());
            }
        },
        kbtobytes: function (kb) {
            return kb * 1024;
        },
        formatBytes: function (bytes) {
            if (bytes == -1) return '0 Byte';
            if (isNaN(bytes)) return '0 Byte';
            if (bytes == 0) return '0 Byte';
            var k = 1024;

            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            try {
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            } catch (e) {
                return '0 Byte';
            }

        },
        formatDate: function (date) {
            var utc_time = date.toUTCString().toString().split(" ");

            var time_str = utc_time[4];

            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + time_str;
        },
        percentage: function (used, total) {
            if (used.isNaN) return 0;
            if (total.isNaN) return 0;
            if (total == 0) return 0;
            var value = (used / total) * 100;
            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value;
        },
        get_color: function (flag, value) {
            if (flag == true) {
                if (value < 50) {
                    return "red"
                }
                if (value >= 50 && value < 75) {
                    return "orange"
                }
                if (value <= 100 && value > 75) {
                    return "green"
                }
            }
            else {
                if (value < 50) {
                    return "green"
                }
                if (value >= 50 && value < 75) {
                    return "orange"
                }
                if (value <= 100 && value > 75) {
                    return "red"
                }
            }

        },
        icon_for_os: function (os) {
            var icon = "fa-question";
            switch (os) {
                case 'Mac OS X':
                    icon = "fa-apple";
                    break;
                case 'iOS':
                    icon = "fa-apple";
                    break;
                case 'Apple Airport':
                    icon = "fa-apple";
                    break;
                case 'Android':
                    icon = "fa-android";
                    break;
                case 'Windows':
                    icon = "fa-windows";
                    break;
                case 'Windows XP':
                    icon = "fa-windows";
                    break;
                case 'Windows 7/Vista':
                    icon = "fa-windows";
                    break;
                case 'Windows Phone 7':
                    icon = "fa-windows";
                    break;
                case 'Windows (Mobile) 8/8.1/10':
                    icon = "fa-windows";
                    break;
                case 'Windows (Mobile) 8/8_1/10':
                    icon = "fa-windows";
                    break;
                case 'Windows (Mobile) 8 / Windows (Mobile) 10':
                    icon = "fa-windows";
                    break;
                case 'Ubuntu/Debian 5/Knoppix 6':
                    icon = "fa-linux";
                    break;
                case 'Linux':
                    icon = "fa-linux";
                    break;
                case 'Amazon Kindle':
                    icon = "fa-amazon";
                    break;
                case 'Chrome OS':
                    icon = "fa-chrome";
                    break;
                case 'Brother Printer':
                    icon = "fa-print";
                    break;
                case 'Canon Printer':
                    icon = "fa-print";
                    break;
                case 'HP Printer':
                    icon = "fa-print";
                    break;
                case 'Samsung SMART-TV':
                    icon = "fa-television";
                    break;

            }


            return icon;
        },

        get_color_list: function () {
            return ["#e3bfb8", "#d2b8e3", "#e1f0c2",
                "#ffffb3", "#fcf5e8", "#fadafa",
                "#c6f6f1", "#ffd0c8", "#f3ecf3",
                "#b3d9d9", "#b3ffd9", "#d2cef0",
                "#e3cbc0", "#c0dccd", "#fce4cf",
                "#ffb3b3", "#d1c2e1", "#d9b3d9",
                "#e7f6f8", "#f5e3f5", "#f0dbc5",
                "#f4d4df", "#e7fafa", "#f4d4f3",
                "#ffc7b3", "#ffe4b3", "#d3ddbd",
                "#b3b3d9", "#d9b3b3", "#ffb3ff",
                "#b3ffb3", "#e7edf5", "#d6dbe1",
                "#bce8e6", "#f2f2f2", "#fbd9d9",
                "#d8feb3", "#fbf8dd", "fbf8dd",
                "#f0cece", "#ffd2e9", "#fff3b3",
                "#b3ffff", "#b3b3ff", "#dcbff6",
                "#e4bfbf", "#ffd9cb"
            ];
        },

        setcolors: function (data) {
            var colors = this.get_color_list();
            for (i = 0; i < data.length; i++) {
                //console.log(data[i]["name"]);

                k = 0;
                if (i < colors.length) {
                    k = i;
                }
                else {
                    k = i % colors.length;
                }
                data[i]["color"] = colors[k];
                if (data[i]["name"] == "online") {
                    data[i]["color"] = "#9ACD32";
                }
                if (data[i]["name"] == "offline") {
                    data[i]["color"] = "grey";
                }

                if (data[i]["name"] == "iowait") {
                    data[i]["color"] = "#DD0000";
                }
                if (data[i]["name"] == "idle") {
                    data[i]["color"] = "#008000";
                }
                if (data[i]["name"] == "system") {
                    data[i]["color"] = "#0000DD";
                }
                if (data[i]["name"] == "user") {
                    data[i]["color"] = "#FF8000";
                }
                if (data[i]["name"] == "Connected" || data[i]["name"] == "connected") {
                    data[i]["color"] = "#9ACD32";
                }
                if (data[i]["name"] == "Disconnected" || data[i]["name"] == "disconnected") {
                    data[i]["color"] = "grey";
                }
                if (data[i]["name"] == "Unknown" || data[i]["name"] == "unknown") {
                    data[i]["color"] = "orange";
                }
                if (data[i]["name"] == "Critical Required") {
                    data[i]["color"] = "orange";
                }
                if (data[i]["name"] == "Minor Required") {
                    data[i]["color"] = "#F5C778";
                }
                if (data[i]["name"] == "Major") {
                    data[i]["color"] = "orange";
                }
                if (data[i]["name"] == "Minor") {
                    data[i]["color"] = "#F5C778";
                }
                if (data[i]["name"] == "Up to date") {
                    data[i]["color"] = "grey";
                }
                if (data[i]["name"] == "not_patched") {
                    data[i]["color"] = "orange";
                    data[i]["name"] = "Not Patched";
                }
                if (data[i]["name"] == "semi_patched") {
                    data[i]["color"] = "#F5C778";
                    data[i]["name"] = "Semi Patched";
                }
                if (data[i]["name"] == "fully_patched") {
                    data[i]["color"] = "grey";
                    data[i]["name"] = "Fully Patched";
                }
                //console.log(data[i]["color"]);

            }
            return data;
        }


    }


});