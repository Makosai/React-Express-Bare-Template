/**
 * This file is mainly used for configuring everything the program may need.
 * It serves as an entrypoint for the... entrypoint!
 */
import dotenv from 'dotenv';

dotenv.config();

if (process.argv.slice(2).includes('node_env=production')) {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}