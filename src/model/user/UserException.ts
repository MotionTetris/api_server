import { UserMessage } from "./UserMessage";

export class UserException extends Error {
    private code: string;

    public constructor(userMessage: UserMessage) {
        const [code, message] = userMessage.split('::');
        super(message);
        this.code = code;
    }
}