# Certificates Folder

Place your actual certificate images in this folder.
For example:
- `cert1.jpg`
- `cert2.jpg`

Then, update the `CERTIFICATES` array in `src/App.tsx` to point to these local files:

```typescript
const CERTIFICATES = [
  { id: 1, title: 'Machine Learning Specialization', url: '/certificates/cert1.jpg' },
  // ...
];
```
