package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.maps.model.LatLng;

import ca.brij.bean.user.MyUserDetailsService;
import ca.brij.bean.user.User;
import ca.brij.bean.user.UserRole;
import ca.brij.dao.user.UserDao;
import ca.brij.utils.ConstantsUtil;
import ca.brij.utils.GeocodingHelper;
import ca.brij.utils.MergeBeanUtil;
import ca.brij.validation.Validator;

@RestController
public class UserController {

	@RequestMapping(value = "/user/register", method = RequestMethod.POST)
	@ResponseBody
	public String register(@RequestBody User userEntity) throws Exception {
		try {
			logger.info("Registering user: " + userEntity.getUsername());
			userEntity.setEnabled(true);
			String exceptions = Validator.userRegisterValid(userEntity);
			userEntity.setStatus(ConstantsUtil.INCOMPLETE);
			if (exceptions.equals("")) {
				String encryptedPassword = new BCryptPasswordEncoder().encode(userEntity.getPassword());
				userEntity.setPassword(encryptedPassword);
				UserRole userRole = new UserRole(userEntity, "ROLE_USER");
				userEntity.getUserRole().add(userRole);
				userDao.save(userEntity);
				UserDetails userDetails = userDetailsService.loadUserByUsername(userEntity.getUsername());
				UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,
						encryptedPassword, userDetails.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(auth);
			} else {
				throw new Exception(ConstantsUtil.EXCEPTION_FLAG + exceptions);
			}
		} catch (Exception e) {
			logger.error("Error registering user: " + userEntity.getUsername() + " message " + e.getMessage());
			throw e;
		}

		logger.info("Successfully registered user: " + userEntity.getUsername());
		return "Success";

	}

	@RequestMapping(value = "/user/save", method = RequestMethod.POST)
	@ResponseBody
	public String updateUser(@RequestBody User updatedUser, Principal principal) throws Exception {
		try {
			logger.info("Saving user: " + principal.getName());
			// password and enabled goes to null as we can't allow to be updated
			// through this request
			updatedUser.setPassword(null);
			updatedUser.setEnabled(null);
			updatedUser.setUserRole(null);
			updatedUser.setUsername(null);
			updatedUser.setStatus(null);
			LatLng location = geoHelper.getLocationFromAddress(
					updatedUser.getAddress() + ", " + updatedUser.getCity() + ", " + updatedUser.getProvince());
			if (location != null) {
				updatedUser.setLatitude(location.lat);
				updatedUser.setLongitude(location.lng);
			}

			User originalUser = userDao.findByUserName(principal.getName());
			MergeBeanUtil.copyNonNullProperties(updatedUser, originalUser);
			// if the user didn't change anything in the status and the original
			// user is incomplete then make it active
			if (originalUser.getStatus().equals(ConstantsUtil.INCOMPLETE)) {
				originalUser.setStatus(ConstantsUtil.ACTIVE);
			}

			userDao.save(originalUser);
		} catch (Exception ex) {
			logger.error("Error saving user" + principal.getName() + "message: " + ex.getMessage());
			throw ex;
		}
		logger.info("Updating user " + principal.getName() + " was successful");
		return "Success";
	}

	@RequestMapping(value = "/admin/user/save", method = RequestMethod.POST)
	@ResponseBody
	public String updateUserByAdmin(@RequestBody User updatedUser, String username) throws Exception {
		try {
			logger.info("Saving user: " + username);
			// password and enabled goes to null as we can't allow to be updated
			// through this request
			updatedUser.setPassword(null);
			updatedUser.setEnabled(null);
			updatedUser.setUserRole(null);
			updatedUser.setUsername(null);
			LatLng location = geoHelper.getLocationFromAddress(
					updatedUser.getAddress() + ", " + updatedUser.getCity() + ", " + updatedUser.getProvince());
			if (location != null) {
				updatedUser.setLatitude(location.lat);
				updatedUser.setLongitude(location.lng);
			}

			User originalUser = userDao.findByUserName(username);
			MergeBeanUtil.copyNonNullProperties(updatedUser, originalUser);

			userDao.save(originalUser);
		} catch (Exception ex) {
			logger.error("Error saving user" + username + "message: " + ex.getMessage());
			throw ex;
		}
		logger.info("Updating user " + username + " was successful");
		return "Success";
	}

	/**
	 * GET /delete --> Delete the user having the passed id.
	 * 
	 * @throws Exception
	 */
	@RequestMapping(value = "/admin/user/delete", method = RequestMethod.DELETE)
	@ResponseBody
	public String delete(String username) throws Exception {
		try {
			logger.info("Deleting user" + username);
			User user = new User(username);
			userDao.delete(user);
		} catch (Exception ex) {
			logger.error("Registering user" + username + " message: " + ex.getMessage());
			throw ex;
		}
		logger.info("Deleting user" + username + " was successful");
		return "Success";
	}

	@RequestMapping("/user/current")
	@ResponseBody
	public User getCurrentUser(Principal principal) {
		User user = null;
		try {
			user = userDao.findByUserName(principal.getName());
		} catch (Exception ex) {
			return null;
		}
		return user;
	}

	@RequestMapping("/admin/user/current")
	@ResponseBody
	public User getUser(String username) {
		User user = null;
		try {
			user = userDao.findByUserName(username);
		} catch (Exception ex) {
			return null;
		}
		return user;
	}

	@RequestMapping("/admin/user/like")
	@ResponseBody
	public Map<String, Object> getLikeUsers(String username,
			@RequestParam(value = "pageNo", required = false) Integer pageNo,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		Map<String, Object> userMap = new HashMap<String, Object>();

		ArrayList<User> users;
		int numberOfPages = 0;
		try {
			if (pageNo == null) {
				pageNo = 0;
			}
			if (pageSize == null) {
				pageSize = 10;
			}
			users = userDao.findByUserLike(username, new PageRequest(pageNo, pageSize));
			numberOfPages = (int) Math.ceil((double) userDao.countUserLike(username) / (double) pageSize);
		} catch (Exception ex) {
			logger.info("Failed to retrieve all users " + ex.getMessage());
			return null;
		}
		userMap.put("users", users);
		userMap.put("numberOfPages", numberOfPages);
		userMap.put("currentPage", (pageNo + 1));
		return userMap;
	}

	/**
	 * Get all the users in the db
	 */
	@RequestMapping(value = "/admin/user/findAll", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getAllUser(@RequestParam(value = "pageNo", required = false) Integer pageNo,
			@RequestParam(value = "pageSize", required = false) Integer pageSize) {
		logger.info("Fiding All users");
		Map<String, Object> userMap = new HashMap<String, Object>();

		ArrayList<User> users;
		int numberOfPages = 0;
		try {
			if (pageNo == null) {
				pageNo = 0;
			}
			if (pageSize == null) {
				pageSize = 10;
			}
			users = userDao.getAll(new PageRequest(pageNo, pageSize));
			numberOfPages = (int) Math.ceil((double) userDao.getCountAll() / (double) pageSize);

		} catch (Exception ex) {
			logger.info("Failed to retrieve all users " + ex.getMessage());
			return null;
		}
		userMap.put("users", users);
		userMap.put("numberOfPages", numberOfPages);
		userMap.put("currentPage", (pageNo + 1));
		return userMap;
	}

	@Autowired
	private UserDao userDao;

	@Autowired
	private MyUserDetailsService userDetailsService;

	@Autowired
	private GeocodingHelper geoHelper;

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

}
