module.exports = function(RED) {
    function HtSensorIn(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.device = config.device;
        this.dev_eui = config.dev_eui;
        RED.httpNode.post(`/ht_sensor/${this.dev_eui}`, function(req, res) {
            let payload = req.body;
            let msg = {};
                switch(config.prop){
                    case 'temperature':
                        msg.payload = payload.data.sensorTemperature;
                    break;
                    case 'humidity':
                        msg.payload = payload.data.relativeHumidity;
                    break;
                    case 'batteryVoltage':
                        msg.payload = payload.data.batteryVoltage;
                    break;
                    case 'rssi':
                        msg.payload = payload.data.rssi;
                    break;
                    case 'payload':
                        msg.payload = payload.data.payload;
                    break;
                    case 'all':
                        msg.payload = payload.data;
                    break;
                }
                node.send(msg);
            res.json({ });
        }); 

    }
    RED.nodes.registerType("ht-sensor-in",HtSensorIn);
}