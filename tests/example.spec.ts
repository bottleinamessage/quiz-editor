import { test, expect } from '@playwright/test';

test('Clicking around quiz-editor...', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Quiz 1 2 questions' }).click();
  await page.getByRole('button', { name: 'Add New Question' }).click();
  await page.getByRole('button', { name: 'Remove' }).nth(2).click();
  await page.getByText('Mark for Delete').click();
});
