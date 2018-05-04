package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.CountryService;
import io.github.jhipster.application.domain.Country;
import io.github.jhipster.application.repository.CountryRepository;
import io.github.jhipster.application.service.dto.CountryDTO;
import io.github.jhipster.application.service.mapper.CountryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Country.
 */
@Service
@Transactional
public class CountryServiceImpl implements CountryService {

    private final Logger log = LoggerFactory.getLogger(CountryServiceImpl.class);

    private final CountryRepository countryRepository;

    private final CountryMapper countryMapper;

    public CountryServiceImpl(CountryRepository countryRepository, CountryMapper countryMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
    }

    /**
     * Save a country.
     *
     * @param countryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CountryDTO save(CountryDTO countryDTO) {
        log.debug("Request to save Country : {}", countryDTO);
        Country country = countryMapper.toEntity(countryDTO);
        country = countryRepository.save(country);
        return countryMapper.toDto(country);
    }

    /**
     * Get all the countries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CountryDTO> findAll() {
        log.debug("Request to get all Countries");
        return countryRepository.findAll().stream()
            .map(countryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one country by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CountryDTO findOne(Long id) {
        log.debug("Request to get Country : {}", id);
        Country country = countryRepository.findOne(id);
        return countryMapper.toDto(country);
    }

    /**
     * Delete the country by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Country : {}", id);
        countryRepository.delete(id);
    }
}
