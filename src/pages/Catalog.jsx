import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const types = ['All', ...new Set(GUNS.map((g) => g.type))]

  const toggleSort = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(type)
      setSortOrder('asc')
    }
  }

  const filtered = useMemo(() => {
    let result = GUNS.filter((gun) => {
      const matchSearch = gun.name.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === 'All' || gun.type === typeFilter
      return matchSearch && matchType
    })

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (sortBy === 'price') {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price
      }
      return 0
    })

    return result
  }, [search, typeFilter, sortBy, sortOrder])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="controls">
          <input
            type="text"
            placeholder="Search guns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="sort-buttons">
            <button
              onClick={() => toggleSort('name')}
              className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => toggleSort('price')}
              className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
            >
              Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filtered.length} pieces</span>
        </div>

        {filtered.length === 0 ? (
          <p className="no-results">No guns match your search.</p>
        ) : (
          <ul className="stock">
            {filtered.map((gun) => <GunCard key={gun.name} gun={gun} />)}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog
