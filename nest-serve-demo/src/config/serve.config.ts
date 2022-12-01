import { getLocalIP } from './../utils/ipUtils';
const serverConfig = {
	port: 3001,
	host: getLocalIP(),
	getBaseUrl() {
		return `http://${getLocalIP()}:${this.port}`
	}
}
export default serverConfig