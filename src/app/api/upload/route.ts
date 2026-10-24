import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const files: File[] = data.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Sanitize extension and generate unique filename
      const originalExt = path.extname(file.name) || '.jpg';
      const safeName = `prop-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${originalExt}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', safeName);

      await writeFile(uploadPath, buffer);
      uploadedUrls.push(`/uploads/${safeName}`);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    });
  } catch (error: any) {
    console.error('File upload failed:', error);
    return NextResponse.json(
      { error: 'Failed to process image uploads' },
      { status: 500 }
    );
  }
}
