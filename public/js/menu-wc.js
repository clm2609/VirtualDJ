'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">Virtual DJ</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' : 'data-target="#xs-components-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' : 'id="xs-components-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' }>
                                        <li class="link">
                                            <a href="components/AppAboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppAboutComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppDeckComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppDeckComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppEffectsCreatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppEffectsCreatorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppEffectsSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppEffectsSelectorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppHelpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppHelpComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppLayoutComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppMusicListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppMusicListComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppSettingsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppTabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppTabsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppVolumeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppVolumeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RouletteControllerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RouletteControllerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SliderControllerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SliderControllerComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' : 'data-target="#xs-directives-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' : 'id="xs-directives-links-module-AppModule-1d08f20ab0be7ec3103888d04ac49069"' }>
                                        <li class="link">
                                            <a href="directives/AngularDraggableDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AngularDraggableDirective</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/HelperBlock.html" data-type="entity-link">HelperBlock</a>
                    </li>
                    <li class="link">
                        <a href="classes/Position.html" data-type="entity-link">Position</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/EQService.html" data-type="entity-link">EQService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/EffectsService.html" data-type="entity-link">EffectsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/HelpService.html" data-type="entity-link">HelpService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MusicLoaderService.html" data-type="entity-link">MusicLoaderService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PlayerService.html" data-type="entity-link">PlayerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/SizeService.html" data-type="entity-link">SizeService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TranslationService.html" data-type="entity-link">TranslationService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/IPosition.html" data-type="entity-link">IPosition</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
