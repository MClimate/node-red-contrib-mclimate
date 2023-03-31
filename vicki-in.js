module.exports = function(RED) {
    function VickiIn(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.device = config.device;
        this.dev_eui = config.dev_eui;

        RED.httpNode.post(`/vicki/${this.dev_eui}`, function(req, res) {
            this.vicki_output = config.vicki_output
            let payload = req.body;
            let msg = {};
            if(config.vicki_output == 'data'){
                msg.payload = payload.data;
            }else{
                msg.payload = payload.data[config.vicki_output];
            }
            // msg.payload = msg;
            node.send(msg);
        })
    }
    RED.nodes.registerType("vicki-in",VickiIn);
}