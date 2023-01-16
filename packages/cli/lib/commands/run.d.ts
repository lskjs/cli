import { Command } from '@oclif/command';
export declare class RunCommand extends Command {
    static strict: boolean;
    run(): Promise<any>;
    parseWithBare(SomeClass: any, argv: string[]): Record<string, any>;
    run2(): Promise<void>;
}
export default RunCommand;
