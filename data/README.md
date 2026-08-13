# Synthetic Data Generation

Generators for KisanConnect's demo dataset. Distributions must be **correlated**,
not independently random — e.g. land size and irrigation access co-vary, asset
ownership correlates with EVI tier. Independent random draws will produce an
unrealistic dataset that undermines the demo.

## Files
- `generators/generate_districts.py` — district reference table (state, district, agro-climatic zone)
- `generators/generate_schemes.py` — scheme catalog (paraphrased from real govt scheme text)
- `generators/generate_farmers.py` — farmer profiles (Faker), correlated asset proxies

## Methodology anchors
- **SECC-2011** deprivation indicators — used to anchor asset-ownership proxy
  distributions (electricity, LPG, house type, vehicle ownership) to realistic
  population-level rates rather than uniform random.
- **India Agriculture Census** — used to anchor land-size distribution and
  landholding-category proportions (marginal / small / semi-medium / medium / large).

## Open items (fill in before final run)
- [ ] Exact synthetic record count
- [ ] Final scheme list (which real schemes to paraphrase)
- [ ] District reference table scope (all-India vs. focus states)

## Output
Generated files land in `data/processed/`. Large generated files are gitignored —
commit only small representative samples (`sample_farmers.csv` etc.) so the repo
stays lightweight; each teammate regenerates the full set locally.
