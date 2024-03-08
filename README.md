# iambored
A command line tool using ChatGPT to suggest things to do when you're bored.

## Setup

1. Install iambored globally to use in any repository:

   ```sh
   npm install -g @redochsenbein/iambored
   ```

### OpenAI

2. Get your API key from [OpenAI](https://platform.openai.com/account/api-keys).

3. Set the key to configuration file at `~/.iambored`:

   ```ini
   OPENAI_API_KEY=<your_api_key>
   ```

### Anthropic Claude 3

2. Get your API key from [Anthropic](https://console.anthropic.com/settings/keys).

3. Set the key to configuration file at `~/.iambored`:

   ```ini
   ANTHROPIC_API_KEY=<your_api_key>
   ```

### Gemini (Not yet supported)

2. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey). Unfortunately this does not seem to be available in Switzerland so I can't currently work on this. 

3. Set the key to configuration file at `~/.iambored`:

   ```ini
   GOOGLE_AI_API_KEY=<your_api_key>
   ```

## Usage

You can call iambored directly to get one activity suggestion. 

```bash
$ iambored 
Write a script which uses GPT to suggest things to do.
```

Take a look at the optional `minutes` and `hours` flags:
```bash
Flags:
  --model <model>
  Set the model to use. Possible values are 'gpt3', 'gpt4', 'anthropic' or 'gemini'. Default is 'gpt3'.
                                                                              
  -h, --help                                                                  
  Show help                                                                   
                                                                              
  --hours <number>                                                            
  How many hours do I have to spare?                                          
                                                                              
  --minutes <number>                                                          
  How many minutes do I have to spare?                                        
                                                                              
  --version                                                                   
  Show version
```

## Acknowledgement

* Uses the activity list of https://github.com/drewthoennes/Bored-API to create prompts.
