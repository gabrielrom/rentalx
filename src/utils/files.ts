import fs from 'fs';

export default {
  async deleteFile(filename: string): Promise<void> {
    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  },
};
