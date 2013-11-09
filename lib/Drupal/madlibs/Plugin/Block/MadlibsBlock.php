<?php

/**
 * @file
 * Contains Drupal\madlibs\Plugin\Block\MadlibsBlock.
 *
 * This is Plugin of the Block type.
 * Drupal finds out about this block via annotations
 *
 * If coming from Drupal 7 the annotations replace hook_block_info.
 * Build function replaces hook_block_view
 */

namespace Drupal\madlibs\Plugin\Block;

use Drupal;
use Drupal\block\BlockBase;


/**
 * Provides a MAdlibs image block.
 *
 * Follow part of comments is an annotation
 * @link https://drupal.org/node/1882526
 *
 * @Block(
 *   id = "madlibs",
 *   admin_label = @Translation("Madlibs")
 * )
 */
class MadlibsBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return array(
      // Define our custom config here.
      // This becomes available in $this->configuration.
      'madlib_picture_fid' => NULL,
    );
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, &$form_state) {
    $form['madlib_picture_fid'] = array(
      '#type' => 'managed_file',
      '#title' => t('Funny photo'),
      '#description' => t('The photo that will display when a user submits a madlib.'),
      '#default_value' => $this->configuration['madlib_picture_fid'],
      '#upload_location' => 'public://',
      '#upload_validators' => array(
        'file_validate_is_image',
      ),
      '#required' => TRUE,
      '#multiple' => FALSE,
    );
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, &$form_state) {
    $this->configuration['madlib_picture_fid'] = $form_state['values']['madlib_picture_fid'];
    drupal_set_message($this->t('The {noun} has been {verbed}.'));
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = array();

    foreach ($this->configuration['madlib_picture_fid'] as $key => $fid) {
      $file = entity_load('file', $fid);

      if ($file) {
        $build['image_' . $key] = array(
          '#theme' => 'image',
          '#uri' => $file->getFileUri(),
          '#alt' => $this->t('Madlibs funny picture'),
        );
      }
    }

    return $build;
  }

}
