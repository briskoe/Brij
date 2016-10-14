package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.posting.Posting;
import ca.brij.bean.service.Service;
import ca.brij.utils.DaoHelper;
import ca.brij.utils.MergeBeanUtil;

@RestController
public class PostingController {

	@Autowired
	private DaoHelper daoHelper;
	

	@RequestMapping(value = "/posting/save", method = RequestMethod.POST)
	@ResponseBody
	public String updatePost(@RequestBody Posting post, Principal principal) throws Exception {
		try {
			logger.info("saving post("+post.getTitle()+") made by: " + principal.getName());
			post.setUserID(principal.getName());
			Posting origPost = null;
			if(post.getId() != null){
				origPost = daoHelper.getPostingDao().getPostingById(post.getId());

			}
			// means is new
			if (origPost == null) {
				origPost = post;
				origPost.setCreationDate(Calendar.getInstance());
			} else {
				// update current one by saving only the changed values (not
				// null)
				MergeBeanUtil.copyNonNullProperties(post, origPost);

			}
			daoHelper.getPostingDao().save(origPost);
		} catch (Exception ex) {
			logger.error("error saving post("+post.getTitle()+") made by: " + principal.getName() + " message " + ex.getMessage());
			throw ex;
		}
		logger.info("Successfully saved post("+post.getTitle()+") made by: " + principal.getName());
		return "Success";
	}

	/**
	 * Find By User
	 * @throws Exception 
	 */
	@RequestMapping(value = "/posting/findByUser", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getPostingByUser(Principal principal, @RequestParam(value = "pageNo", required=false) Integer pageNo, @RequestParam(value = "pageSize", required=false) Integer pageSize) throws Exception {
		Map<String, Object> postingsMap = new HashMap<String, Object>();
		ArrayList<Posting> postings = null;
		int numberOfPages = 0;
		try {
			logger.info("retrieving all posts made by: " + principal.getName());
			if(pageNo == null){
				pageNo = 0;
			}
			if(pageSize == null){
				pageSize = 10;
			}
			postings = daoHelper.getPostingDao().getPostingsByUserID(principal.getName(), new PageRequest(pageNo, pageSize));
			numberOfPages = (int)Math.ceil((double)daoHelper.getPostingDao().getCountOfUser(principal.getName()) / (double)pageSize);
		} catch (Exception ex) {
			logger.error("Error retrieving all users made by " + principal.getName());
			throw ex;
		}
		postingsMap.put("list", postings);
		postingsMap.put("numberOfPages", numberOfPages);
		postingsMap.put("currentPage", (pageNo + 1));
		logger.info("successfully retrieved posts made by: " + principal.getName());
		return postingsMap;
	}
	
	/**
	 * Find By id
	 */
	@RequestMapping(value = "/posting/findById", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getPostingById(Principal principal, int id) {
		Posting posting = null;
		Map<String, Object> map = new HashMap<String, Object>();
		Boolean isOwner = false;
		
		try {
			logger.info("retrieving post by id" +  id);
			posting = daoHelper.getPostingDao().getPostingById(id);
			Service service = daoHelper.getServiceDao().getServiceById(posting.getServID());
			String serviceName = service.getServiceName();
			
			isOwner = posting.getUserID().equals(principal.getName());
						
			map.put("serviceName", serviceName);
			
		} catch (Exception ex) {
			logger.error("Error occurred retrieving post " + ex.getMessage());
			return null;
		}
		logger.info("Successfully retrieved post by id " + id);
		
		map.put("posting", posting);
		map.put("isOwner", isOwner);
		
		return map;
	}

	/**
	 * Get all the postings in the db
	 * @throws Exception 
	 */
	@RequestMapping(value = "/posting/findAll", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getAllPosting(@RequestParam(value = "pageNo", required=false) Integer pageNo,@RequestParam(value = "pageSize", required=false) Integer pageSize ) throws Exception {
		Map<String, Object> postingsMap = new HashMap<String, Object>();
		ArrayList<Posting> postings;
		int numberOfPages = 0;
		try {
			logger.info("Retrieving all posts");
			if(pageNo == null){
				pageNo = 0;
			}
			if(pageSize == null){
				pageSize = 10;
			}
			postings = daoHelper.getPostingDao().getAllPostings(new PageRequest(pageNo, pageSize));
			//divide then take the decimal away. Ex 10.5 will give 10
			numberOfPages = (int)Math.ceil((double)daoHelper.getPostingDao().getCountOfAll() / (double)pageSize);
			
		} catch (Exception ex) {
			logger.error("Failed retrieving posts " + ex.getMessage());
			throw ex;
		}
		postingsMap.put("list", postings);
		postingsMap.put("numberOfPages", numberOfPages);
		postingsMap.put("currentPage", (pageNo + 1));

		return postingsMap;
	}
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

}

