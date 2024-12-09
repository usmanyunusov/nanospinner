let { createSpinner } = require('../dist')

async function demoNanospinner() {
  // Success demo with color changes
  const successSpinner = createSpinner('Loading...').start();

  // Color sequence
  await new Promise((resolve) => setTimeout(resolve, 1000));
  successSpinner.update({ color: 'yellow' });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  successSpinner.update({ color: 'red' });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  successSpinner.update({ color: 'green' });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  successSpinner.update({ color: 'blue' });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  successSpinner.success({ text: 'Operation completed successfully' });

  // Error demo
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const errorSpinner = createSpinner('Processing...').start();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  errorSpinner.error({ text: 'Operation failed' });

  // Try-catch demo
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const finalSpinner = createSpinner('Attempting risky operation...').start();
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    throw new Error('Intentional error');
  } catch (error) {
    console.error('\nError caught:', error.message);
  } finally {
    finalSpinner.stop();
  }
}

demoNanospinner();
