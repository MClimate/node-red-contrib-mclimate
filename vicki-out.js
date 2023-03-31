module.exports = function(RED) {
    var axios = require("axios");
    this.token = "dd113bed1913413d17589183be81d66234b3d317";
    this.api = "https://developer-api.seemelissa.com/v1";
    function VickiOut(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.device = config.device;
        this.dev_eui = config.dev_eui;
        this.serial_number = config.serial_number;
        this.vicki_command = config.vicki_command
       
        var command, body; 
        node.on('input', function(msg, send, done) {   
            if(this.serial_number == ""){
                console.log('Serial Number is missing');
                return false;
            }

            switch(this.vicki_command){
                case 'set_ext_temp':
                    body = {
                        serial_number: this.serial_number,
                        command: 'set_ext_temp',
                        temp: Math.round(msg.payload)
                    }
                    sendCommand(body)
                break;
                case 'target_temperature':
                    body = {
                        serial_number: this.serial_number,
                        command: 'set_motor_position',
                        position: Math.round(msg.payload)
                    }
                    sendCommand(body)
                break;
                case 'motor_position':
                    body = {
                        serial_number: this.serial_number,
                        command: 'set_motor_position_only',
                        position: Math.round(msg.payload)
                    }
                    sendCommand(body)
                break;
                case 'set_keepalive_time':
                    body = {
                        serial_number: this.serial_number,
                        command: 'set_keepalive_time',
                        time: msg.payload
                    }
                    sendCommand(body)
                break;
                case 'recalibrate_motor':
                    body = {
                        serial_number: this.serial_number,
                        command: 'recalibrate_motor'
                    }
                    sendCommand(body)
                break;
                case 'set_range':
                    let min = msg.payload.min;
                    let max = msg.payload.max;

                    body = {
                        serial_number: this.serial_number,
                        command: 'set_range',
                        min: min,
                        max: max
                    }
                    sendCommand(body)
                break;
                case 'force_close_vicki':
                    body = {
                        serial_number: this.serial_number,
                        command: 'force_close_vicki'
                    }
                    sendCommand(body)
                break;
                case 'set_offline_algo_params':
                    let period = msg.payload.period;
                    let p_first_last = msg.payload.p_first_last;
                    let p_next = msg.payload.p_next;

                    body = {
                        serial_number: this.serial_number,
                        command: 'set_offline_algo_params',
                        period: period,
                        p_first_last: p_first_last,
                        p_next: p_next
                    }
                    sendCommand(body)
                break;
                case 'set_offline_algo_tdiff_params':
                    let open = msg.payload.open;
                    let close = msg.payload.close;
                    body = {
                        serial_number: this.serial_number,
                        command: 'set_offline_algo_tdiff_params',
                        warm: open,
                        cold: close
                    }
                    sendCommand(body)
                break;
                case 'set_uplink_type':
                    body = {
                        serial_number: this.serial_number,
                        command: 'set_uplink_type',
                        type: msg.payload
                    }
                    sendCommand(body)
                break;
            }
        });
    }

    const sendCommand = (body) => {
        console.log(body);
        return axios.post(`${this.api}/provider/send`, body, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` } })
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error);
            });
    }
    RED.nodes.registerType("vicki-out",VickiOut);
}