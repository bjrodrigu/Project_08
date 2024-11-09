package com.campus_rating_system;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.campus_rating_system.services.AddFavoritePlaceService;
import com.campus_rating_system.services.GetFavoriteLocationsService;
import com.campus_rating_system.entities.Favorite;
import com.campus_rating_system.entities.Location;

import java.util.List;

@RestController
public class CampusRatingSystemController {

  @Autowired
  private final AddFavoritePlaceService addFavoritePlaceService;
  private final GetFavoriteLocationsService getFavoriteLocationsService;

  public CampusRatingSystemController(AddFavoritePlaceService addFavoritePlaceService,
                            GetFavoriteLocationsService getFavoriteLocationsService) {
        this.addFavoritePlaceService = addFavoritePlaceService;
        this.getFavoriteLocationsService = getFavoriteLocationsService;
  }

    @PostMapping("/favorite/addFavorite")
    public ResponseEntity<Favorite> addFavoritePlace(
            @RequestParam Integer userId,
            @RequestParam Integer locationId) {

        Favorite newFavorite = addFavoritePlaceService.addFavoritePlace(userId, locationId);
        return new ResponseEntity<>(newFavorite, HttpStatus.CREATED);
    }

    @GetMapping("/favorite/getFavorites")
    public List<Location> getFavoriteLocations(@RequestParam Integer userId) {
        return getFavoriteLocationsService.getFavoriteLocations(userId);
    }
}
