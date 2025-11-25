import { convertCollectionsSnapshotToMap } from './firebase.utils';

describe('Firebase Utils', () => {
  describe('convertCollectionsSnapshotToMap', () => {
    it('should convert Firestore snapshot to collections map', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'doc1',
            data: () => ({
              title: 'Hats',
              items: [
                { id: 1, name: 'Hat 1', price: 20 },
                { id: 2, name: 'Hat 2', price: 25 }
              ]
            })
          },
          {
            id: 'doc2',
            data: () => ({
              title: 'Sneakers',
              items: [
                { id: 3, name: 'Sneaker 1', price: 100 }
              ]
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result).toHaveProperty('hats');
      expect(result).toHaveProperty('sneakers');
      expect(result.hats.title).toBe('Hats');
      expect(result.sneakers.title).toBe('Sneakers');
    });

    it('should create routeName by lowercasing and encoding title', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'doc1',
            data: () => ({
              title: 'Womens Hats',
              items: []
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result['womens hats'].routeName).toBe('womens%20hats');
    });

    it('should include document ID in transformed collection', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'unique-doc-id',
            data: () => ({
              title: 'Jackets',
              items: []
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result.jackets.id).toBe('unique-doc-id');
    });

    it('should preserve items array in collection', () => {
      const mockItems = [
        { id: 1, name: 'Item 1', price: 10, imageUrl: 'test.jpg' },
        { id: 2, name: 'Item 2', price: 20, imageUrl: 'test2.jpg' }
      ];
      const mockSnapshot = {
        docs: [
          {
            id: 'doc1',
            data: () => ({
              title: 'Test Collection',
              items: mockItems
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result['test collection'].items).toEqual(mockItems);
      expect(result['test collection'].items).toHaveLength(2);
    });

    it('should handle empty snapshot', () => {
      const mockSnapshot = {
        docs: []
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result).toEqual({});
    });

    it('should handle single collection', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'single-doc',
            data: () => ({
              title: 'Single Collection',
              items: [{ id: 1, name: 'Item', price: 50 }]
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(Object.keys(result)).toHaveLength(1);
      expect(result['single collection']).toBeDefined();
    });

    it('should use lowercase title as key in result map', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'doc1',
            data: () => ({
              title: 'UPPERCASE',
              items: []
            })
          },
          {
            id: 'doc2',
            data: () => ({
              title: 'MixedCase',
              items: []
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result).toHaveProperty('uppercase');
      expect(result).toHaveProperty('mixedcase');
      expect(result.uppercase.title).toBe('UPPERCASE');
      expect(result.mixedcase.title).toBe('MixedCase');
    });

    it('should handle collections with special characters in title', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'doc1',
            data: () => ({
              title: "Men's Shoes",
              items: []
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);

      expect(result["men's shoes"]).toBeDefined();
      expect(result["men's shoes"].routeName).toBe("men's%20shoes");
    });

    it('should maintain all required properties in transformed collection', () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'test-id',
            data: () => ({
              title: 'Test',
              items: [{ id: 1, name: 'Item', price: 10 }]
            })
          }
        ]
      };

      const result = convertCollectionsSnapshotToMap(mockSnapshot);
      const collection = result.test;

      expect(collection).toHaveProperty('id');
      expect(collection).toHaveProperty('title');
      expect(collection).toHaveProperty('routeName');
      expect(collection).toHaveProperty('items');
    });
  });
});
