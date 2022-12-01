import { join } from 'path';
import { registerAs } from '@nestjs/config';


export default registerAs('file', () => ({
	root: join(__dirname, '../../public/uploads'),
	relpaceRoot: join(__dirname, '../../public'),
}));