function ConvertBoolean(string) {
    if (string === '0' || string === 'false' || string === 'no' || string === 'n') return false;
    if (string === '' || string === '1' || string === 'true' || string === 'yes' || string === 'y') return true;

    throw Error(`Invalid Boolean Value "${string}"`);
}

function parseCLI(argv, search) {
    const parsed = {};
    let lastKey = null;

    for (let i = 0; i <= argv.length; i++) {
        const arg = argv[i] || '';

        if (lastKey !== null || i === argv.length) {
            const argValue = arg.startsWith("--") ? '' : arg

            const argType = search[lastKey]
            if (argType) {
                switch (argType) {
                    case "flag": {
                        parsed[lastKey] = true;

                        break;
                    }
    
                    case "array": {
                        if (parsed[lastKey]) {
                            parsed[lastKey].push(argValue)
                        } else {
                            parsed[lastKey] = [argValue]
                        }

                        break;
                    }
    
                    case "string": {
                        parsed[lastKey] = argValue;
                        
                        break;
                    }
    
                    case "bool": {
                        parsed[lastKey] = ConvertBoolean(argValue);
    
                        break;
                    }
                    
                    default: {
                        if (!argType instanceof RegExp) {
                            throw Error(`Unknown Type "${argType}"`)
                        }

                        const result = argType.exec(argValue);

                        if (result) {
                            parsed[lastKey] = [...result]
                        }
                    }
                }
    
                lastKey = null;
            }
        }

        if (arg.startsWith("--")) {
            lastKey = arg.slice(2);
        }
    }

    return parsed
}

module.exports = parseCLI;