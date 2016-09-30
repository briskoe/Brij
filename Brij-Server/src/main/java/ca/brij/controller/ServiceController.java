package ca.brij.controller;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.service.Service;
import ca.brij.dao.service.ServiceDao;
@RestController
public class ServiceController {

	@Autowired
	private ServiceDao serviceDao;
	
	@RequestMapping(value = "/service/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveService(@RequestBody Service service) throws Exception{
		
		try{
			logger.info("Saving service");
			serviceDao.save(service);
			
		}catch(Exception e){
			logger.error("Error saving service " + e.getMessage());
			throw e;
		}
		logger.info("Successfully saved service");
		return "Success";
	}
	
	@RequestMapping(value = "/service/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Service> findAll() throws Exception{
		ArrayList<Service> services = null;
		try{
			logger.info("Finding All Services");
			services = serviceDao.getAllServices();
		}catch(Exception e){
			logger.error("Error finding all services " + e.getMessage());
			throw e;
		}
		logger.info("Successfully got all services");
		return services;
	}
	
	@RequestMapping(value = "/service/findById", method = RequestMethod.GET)
	@ResponseBody
	public Service findByID(int id) throws Exception{
		Service service = null;
		try{
			logger.info("Finding a service by id " + id);
			service = serviceDao.getServiceById(id);
		}catch(Exception e){
			logger.error("Error finding a service " + e.getMessage());
			throw e;
		}
		logger.info("Successfully got a service");
		return service;
	}
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
}
