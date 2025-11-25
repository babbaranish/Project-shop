import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import SearchBox from '../search-box/search-box.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { CollectionsOverviewContainer, ControlsContainer, FilterContainer, SelectStyled } from './collections-overview.styles';

class CollectionsOverview extends React.Component {
  state = {
    searchQuery: '',
    sortBy: 'default',
    filterByPrice: 'all'
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handleSortChange = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  handleFilterChange = (e) => {
    this.setState({ filterByPrice: e.target.value });
  };

  filterAndSortCollections = () => {
    const { collections } = this.props;
    const { searchQuery, sortBy, filterByPrice } = this.state;

    let filteredCollections = collections.map(collection => {
      let filteredItems = collection.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery)
      );

      if (filterByPrice !== 'all') {
        if (filterByPrice === 'under50') {
          filteredItems = filteredItems.filter(item => item.price < 50);
        } else if (filterByPrice === '50to100') {
          filteredItems = filteredItems.filter(item => item.price >= 50 && item.price <= 100);
        } else if (filterByPrice === 'over100') {
          filteredItems = filteredItems.filter(item => item.price > 100);
        }
      }

      if (sortBy === 'price-low') {
        filteredItems = filteredItems.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filteredItems = filteredItems.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'name') {
        filteredItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name));
      }

      return { ...collection, items: filteredItems };
    }).filter(collection => collection.items.length > 0);

    return filteredCollections;
  };

  render() {
    const filteredCollections = this.filterAndSortCollections();

    return (
      <div>
        <ControlsContainer>
          <SearchBox
            placeholder="Search products..."
            handleChange={this.handleSearchChange}
          />
          <FilterContainer>
            <SelectStyled value={this.state.sortBy} onChange={this.handleSortChange}>
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </SelectStyled>
            <SelectStyled value={this.state.filterByPrice} onChange={this.handleFilterChange}>
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </SelectStyled>
          </FilterContainer>
        </ControlsContainer>
        <CollectionsOverviewContainer>
          {filteredCollections.length > 0 ? (
            filteredCollections.map(({ id, ...otherCollectionProps }) => (
              <CollectionPreview key={id} {...otherCollectionProps} />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#999' }}>
              No products found matching your criteria
            </div>
          )}
        </CollectionsOverviewContainer>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
