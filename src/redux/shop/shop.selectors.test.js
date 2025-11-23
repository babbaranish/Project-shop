import {
  selectCollections,
  selectCollectionsForPreview,
  selectCollection
} from './shop.selectors';

describe('Shop Selectors', () => {
  const mockCollections = {
    hats: {
      id: 1,
      title: 'Hats',
      routeName: 'hats',
      items: [
        { id: 1, name: 'Hat 1', price: 20 },
        { id: 2, name: 'Hat 2', price: 25 }
      ]
    },
    sneakers: {
      id: 2,
      title: 'Sneakers',
      routeName: 'sneakers',
      items: [
        { id: 3, name: 'Sneaker 1', price: 100 },
        { id: 4, name: 'Sneaker 2', price: 120 }
      ]
    },
    jackets: {
      id: 3,
      title: 'Jackets',
      routeName: 'jackets',
      items: [
        { id: 5, name: 'Jacket 1', price: 150 }
      ]
    }
  };

  const mockState = {
    shop: {
      collections: mockCollections
    },
    cart: {
      hidden: true,
      cartItems: []
    },
    user: {
      currentUser: null
    }
  };

  describe('selectCollections', () => {
    it('should select collections from state', () => {
      const collections = selectCollections(mockState);

      expect(collections).toEqual(mockCollections);
    });

    it('should return null when collections are not loaded', () => {
      const emptyState = {
        shop: { collections: null }
      };

      const collections = selectCollections(emptyState);

      expect(collections).toBeNull();
    });
  });

  describe('selectCollectionsForPreview', () => {
    it('should convert collections object to array', () => {
      const collectionsArray = selectCollectionsForPreview(mockState);

      expect(Array.isArray(collectionsArray)).toBe(true);
      expect(collectionsArray).toHaveLength(3);
    });

    it('should contain all collections', () => {
      const collectionsArray = selectCollectionsForPreview(mockState);

      expect(collectionsArray).toContainEqual(mockCollections.hats);
      expect(collectionsArray).toContainEqual(mockCollections.sneakers);
      expect(collectionsArray).toContainEqual(mockCollections.jackets);
    });

    it('should return empty array when collections are null', () => {
      const emptyState = {
        shop: { collections: null }
      };

      const collectionsArray = selectCollectionsForPreview(emptyState);

      expect(collectionsArray).toEqual([]);
    });

    it('should return empty array when collections are undefined', () => {
      const emptyState = {
        shop: { collections: undefined }
      };

      const collectionsArray = selectCollectionsForPreview(emptyState);

      expect(collectionsArray).toEqual([]);
    });

    it('should memoize the result when state has not changed', () => {
      const array1 = selectCollectionsForPreview(mockState);
      const array2 = selectCollectionsForPreview(mockState);

      expect(array1).toBe(array2);
    });
  });

  describe('selectCollection', () => {
    it('should select a specific collection by URL parameter', () => {
      const hatsSelector = selectCollection('hats');
      const hatsCollection = hatsSelector(mockState);

      expect(hatsCollection).toEqual(mockCollections.hats);
    });

    it('should select different collections based on parameter', () => {
      const sneakersSelector = selectCollection('sneakers');
      const jacketsSelector = selectCollection('jackets');

      const sneakers = sneakersSelector(mockState);
      const jackets = jacketsSelector(mockState);

      expect(sneakers).toEqual(mockCollections.sneakers);
      expect(jackets).toEqual(mockCollections.jackets);
    });

    it('should return null when collection does not exist', () => {
      const nonExistentSelector = selectCollection('nonexistent');
      const result = nonExistentSelector(mockState);

      expect(result).toBeNull();
    });

    it('should return null when collections are not loaded', () => {
      const emptyState = {
        shop: { collections: null }
      };
      const hatsSelector = selectCollection('hats');
      const result = hatsSelector(emptyState);

      expect(result).toBeNull();
    });

    it('should be case-sensitive', () => {
      const upperCaseSelector = selectCollection('HATS');
      const result = upperCaseSelector(mockState);

      expect(result).toBeNull();
    });

    it('should memoize results for the same collection parameter', () => {
      const hatsSelector1 = selectCollection('hats');
      const hatsSelector2 = selectCollection('hats');

      const result1 = hatsSelector1(mockState);
      const result2 = hatsSelector2(mockState);

      expect(result1).toEqual(result2);
    });
  });
});
