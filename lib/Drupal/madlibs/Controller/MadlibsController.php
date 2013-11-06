<?php
/**
 * @file
 * Contains \Drupal\madlibs\Controller\MadlibsController
 */
namespace Drupal\madlibs\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class MadlibsController
 * @package Drupal\madlibs\Controller
 *
 * We extend ControllerBase because this is a thin controller.
 * It doesn't contain much logic
 * @see \Drupal\Core\Controller\ControllerBase
 */
class MadlibsController extends ControllerBase {
  /** 
   * Page callback for '/madlibs'
   *
   * This route is not connected to a menu item.
   * You have to go to /madlibs to test.
   *
   * Drupal 7 docs on render arrays
   * @link https://drupal.org/node/930760
   * This connected to the path via the *.routing.yml
   * @return array
   *  Render array
   */
  public function page() {

    $build = array(
      '#markup' => '',
      '#theme' => 'madlibs',
      '#attached' => array(
        'js' => array(
          drupal_get_path('module', 'madlibs') . '/js/madlibs_maker.js',
        ),
      ),
    );  

    return $build;
  }
} 
