import logger from "./loggerService";
import morgan from "morgan"

logger.stream = {
    write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

export default morgan(
    ':method :url :status :response-time ms - :res[content-length]',
    {stream: logger.stream}
);